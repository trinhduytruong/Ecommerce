package doan.ecm.controller.guest;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Category;
import doan.ecm.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public PaginatedResponse<Category> getAllCategories(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getAllCategories) #####");
        try {
            Page<Category> categoryPage = this.categoryService.getListCategories(name, status, page, size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", categoryPage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getAllCategories) #####");
        }
    }

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Category>> getCategoryById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (getCategoryById) #####");
        try{
            Category category = categoryService.getCategoryById(id);
            PaginatedResponse.SingleResponse<Category> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", category
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Category> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (getCategoryById) #####");
        }
    }
}
