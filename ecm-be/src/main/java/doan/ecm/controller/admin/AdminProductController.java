package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.dto.ProductRequest;
import doan.ecm.model.Product;
import doan.ecm.service.CategoryService;
import doan.ecm.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/products")

public class AdminProductController {

    private static final Logger logger = LoggerFactory.getLogger(AdminProductController.class);

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public PaginatedResponse<Product> getListProducts(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "sort", required = false, defaultValue = "") String sort,
            @RequestParam(value = "brand_id", required = false) Long brand_id,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "product_labels", required = false, defaultValue = "") String  productLabelIds,
            @RequestParam(value = "category_id", required = false) Long category_id,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListProducts) [Admin] #####");
        try {
            Page<Product> productPage = this.productService.getListProducts(name, status, productLabelIds, category_id,
                    brand_id, page, size, sort);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", productPage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại",null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListProducts) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Product>> createProduct(
            @RequestBody ProductRequest request) {
        logger.info("##### REQUEST RECEIVED (createProduct) [Admin] #####");
        try {
            if (request.getCategoryId() == null) {
                throw new RuntimeException("Category ID must not be null");
            }
            Product createdProduct = productService.createProduct(request);
            PaginatedResponse.SingleResponse<Product> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", createdProduct
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createProduct) [Admin] #####");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Product>> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {
        logger.info("##### REQUEST RECEIVED (updateProduct) [Admin] #####");
        try {
            Product updatedProduct = productService.updateProduct(id, request);
            PaginatedResponse.SingleResponse<Product> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updatedProduct
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateProduct) [Admin] #####");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Product>> deleteProduct(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteProduct) [Admin] #####");
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0,"successfully", null
            ));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteProduct) [Admin] #####");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Product>> getProductById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (getProductById) [Admin] #####");
        try {
            Product product = productService.getProductById(id);
            PaginatedResponse.SingleResponse<Product> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", product
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (getProductById) [Admin] #####");
        }
    }
}
