package doan.ecm.service;

import doan.ecm.dto.ArticleRequest;
import doan.ecm.model.Article;
import doan.ecm.model.ArticleTag;
import doan.ecm.model.Tag;
import doan.ecm.repository.ArticleRepository;
import doan.ecm.repository.ArticleTagRepository;
import doan.ecm.repository.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    private static final Logger logger = LoggerFactory.getLogger(ArticleService.class);

    @Autowired
    private ArticleRepository repository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private ArticleTagRepository articleTagRepository;

    public Page<Article> getLists(int page, int size, String name, String tagIds, Long menu_id, String status) {
        try{
            Pageable pageable = PageRequest.of(page - 1, size);
            Set<Long> dataIds  = null;
            if(tagIds != null && !tagIds.isEmpty()) {
                Set<Long> labelIds= (tagIds != null && !tagIds.isEmpty()) ?
                        Arrays.stream(tagIds.split(",")).map(Long::parseLong).collect(Collectors.toSet()) :
                        null;
                List<ArticleTag> dataProductsLabels = this.articleTagRepository.getLists(labelIds, null);
                if(!dataProductsLabels.isEmpty()) {
                    dataIds  = dataProductsLabels.stream()
                            .map(productLabel -> productLabel.getArticle().getId())  // Assuming `getId()` returns Long
                            .collect(Collectors.toSet());
                } else {
                    return null;
                }
            }
            Page<Article> articlePage = repository.getLists(pageable,name, dataIds, menu_id, status);
            logger.info("articlePage: " + articlePage);
            logger.info("List article: " + articlePage.getContent());
            return articlePage;

        } catch (Exception e){
            logger.error("ArticleService.getLists() ", e);
            throw new RuntimeException("Failed to fetch article", e);
        }
    }


    @Transactional
    public Article create(Article article, Set<Long> tagIds) {
        try {
            // Kiểm tra nếu tagIds là null, set nó thành một tập rỗng
            if (!tagIds.isEmpty()) {
                Set<Tag> tags = tagIds.stream()
                        .map(tagId -> tagRepository.findById( tagId)
                                .orElseThrow(() -> new RuntimeException("Tag not found: " + tagId)))
                        .collect(Collectors.toSet());
                article.setTags(tags);
            }
            article.setCreated_at(new Date());
            article.setUpdated_at(new Date());
            logger.info("Create article: " + article);
            return repository.save(article);
        } catch (Exception e){
            logger.error("ArticleService.create() ", e);
            throw new RuntimeException("Failed to fetch article", e);
        }
    }

    public Article update(Long id, ArticleRequest articleRequest) {
        try {
            Optional<Article> articleOptional = repository.findById(id);
            if (articleOptional.isPresent()) {
                Article article = articleOptional.get();
                article.setName(articleRequest.getName());
                article.setSlug(articleRequest.getSlug());
                article.setStatus(articleRequest.getStatus() != null ? articleRequest.getStatus() : "published");
                article.setAvatar(articleRequest.getAvatar());
                article.setDescription(articleRequest.getDescription());
                article.setUpdated_at(new Date());

                if (articleRequest.getTags() != null && !articleRequest.getTags().isEmpty()) {
                    Set<Tag> tags = articleRequest.getTags().stream()
                            .map(tagId -> tagRepository.findById(tagId)
                                    .orElseThrow(() -> new RuntimeException("Tag not found: " + tagId)))
                            .collect(Collectors.toSet());
                    article.setTags(tags);
                }
                logger.info("Update article with ID: " + id);
                return repository.save(article);
            } else {
                throw new RuntimeException("Article not found with id " + id);
            }
        } catch (Exception e){
            logger.error("ArticleService.update() ", e);
            throw new RuntimeException("Failed to fetch article", e);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete article with ID: " + id);
            } else {
                throw new RuntimeException("Article not found with id " + id);
            }
        } catch (Exception e){
            logger.error("ArticleService.delete() ", e);
            throw new RuntimeException("Failed to fetch article", e);
        }
    }

    public Article findById(Long id) {
        logger.info("Get article with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id " + id));
    }

    public Article findBySlug(String slug) {
        logger.info("Get article by slug: " + slug);
        return repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Article not found with slug " + slug));
    }
}
