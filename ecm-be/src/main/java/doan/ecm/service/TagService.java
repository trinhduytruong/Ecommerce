package doan.ecm.service;

import doan.ecm.model.Tag;
import doan.ecm.repository.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class TagService {

    private static final Logger logger = LoggerFactory.getLogger(TagService.class);

    @Autowired
    private TagRepository repository;

    public Page<Tag> getLists(int page, int size, String name) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Tag> tagPage = repository.getLists(name, pageable);
            logger.info("TagPage: " + tagPage);
            logger.info("List tag: " + tagPage.getContent());
            return tagPage;
        } catch (Exception e) {
            logger.error("TagService.getLists(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Tag create(Tag tag) {
        try {
            tag.setCreated_at(new Date());
            tag.setUpdated_at(new Date());
            tag.setStatus(tag.getStatus() != null ? tag.getStatus() : "published");
            logger.info("Create tag: " + tag);
            return repository.save(tag);
        } catch (Exception e) {
            logger.error("TagService.create(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Tag update(Long id, Tag tag) {
        try {
            Optional<Tag> tagOptional = repository.findById(id);
            if (tagOptional.isPresent()) {
                Tag existingTag = tagOptional.get();
                existingTag.setName(tag.getName());
                existingTag.setSlug(tag.getSlug());
                if(tag.getStatus() != null) {
                    existingTag.setStatus(tag.getStatus());
                }
                if(existingTag.getStatus() == null) {
                    existingTag.setStatus("published");
                }
                existingTag.setDescription(tag.getDescription());
                existingTag.setUpdated_at(new Date());

                logger.info("Update tag with ID: " + id);
                return repository.save(existingTag);
            } else {
                throw new RuntimeException("Tag not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("TagService.update(): " + e);
            throw new RuntimeException(e);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete tag with ID: " + id);
            } else {
                throw new RuntimeException("Data not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("TagService.delete(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Tag findById(Long id) {
        logger.info("Get tag with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data not found with id " + id));
    }

    public Tag findBySlug(String slug) {
        logger.info("Get tag with slug: " + slug);
        return repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Data not found with slug " + slug));
    }
}
