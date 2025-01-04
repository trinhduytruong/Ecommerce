package doan.ecm.service;

import doan.ecm.model.Category;
import doan.ecm.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

    @Autowired
    private CategoryRepository categoryRepository;
    private  Category buildData(Category requestDto, Category data) {
        if(data == null) {
            data = new Category();
            data.setCreated_at(new Date());
        }

        if(requestDto.getAvatar() != null && !requestDto.getAvatar().isEmpty()) {
            data.setAvatar(requestDto.getAvatar());
        }
        if(requestDto.getStatus() != null && !requestDto.getStatus().isEmpty()) {
            data.setStatus(requestDto.getStatus());
        } else {
            data.setStatus("published");

        }
        if(requestDto.getName() != null) {
            data.setName(requestDto.getName());
        }
        if(requestDto.getSlug() != null) {
            data.setSlug(requestDto.getSlug());
        }
        if(requestDto.getParent_id() != null) {
            data.setParent_id(requestDto.getParent_id());
        } else {
            data.setParent_id(Long.parseLong("0"));
        }

        if(requestDto.getIndex_seo() != null) {
            data.setIndex_seo(requestDto.getIndex_seo());
        } else {
            data.setIndex_seo(0);
        }
        data.setDescription(requestDto.getDescription() != null ? requestDto.getDescription() : (data.getDescription()  != null ? data.getDescription() : null));
        data.setUpdated_at(new Date());
        return data;
    }
    public Page<Category> getListCategories(String name, String status, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Category> categoryPage = categoryRepository.getListCategories(name, status, pageable);
            logger.info("categoryPage: " + categoryPage);
            logger.info("List category: " + categoryPage.getContent());
            return categoryPage;
        } catch (Exception e) {
            logger.error("CategoryService.getListCategories(): " + e);
            throw new RuntimeException(e);
        }
    }
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        try {
            Category newCategory = this.buildData(category, null);
            logger.info("Create category: " + newCategory);
            return categoryRepository.save(newCategory);
        } catch (Exception e) {
            logger.error("CategoryService.createCategory(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Category updateCategory(Long id, Category category) {
        try {
            Optional<Category> categoryOptional = categoryRepository.findById(id);
            if (categoryOptional.isPresent()) {
                Category existingCategory = this.buildData(category, categoryOptional.get());
                logger.info("Updated category with ID: " + id);
                return categoryRepository.save(existingCategory);
            } else {
                throw new RuntimeException("Category not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("CategoryService.updateCategory(): " + e);
            throw new RuntimeException(e);
        }
    }

    public void deleteCategory(Long id) {
        try {
            if (categoryRepository.existsById(id)) {
                categoryRepository.deleteById(id);
                logger.info("Deleted category with ID: " + id);
            } else {
                throw new RuntimeException("Category not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("CategoryService.deleteCategory(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Category getCategoryById(Long id) {
        logger.info("Get category with ID: " + id);
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
    }
}
