package doan.ecm.controller.guest;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.controller.user.OrderController;
import doan.ecm.model.Product;
import doan.ecm.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService service;

    @GetMapping
    public PaginatedResponse<Product> getListProducts(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "sort", required = false, defaultValue = "") String sort,
            @RequestParam(value = "brand_id", required = false) Long brand_id,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "product_labels", required = false, defaultValue = "") String  productLabelIds,
            @RequestParam(value = "category_id", required = false) Long category_id,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListProducts) #####");
        try {
            Page<Product> productPage = this.service.getListProducts(name, status, productLabelIds, category_id,
                    brand_id, page, size, sort);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", productPage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại",null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListProducts) #####");
        }
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Product>> findProductBySlug(@PathVariable String slug) {
        logger.info("##### REQUEST RECEIVED (findProductBySlug) #####");
        try{
            Product product = service.findBySlug(slug);
            PaginatedResponse.SingleResponse<Product> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", product
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Product> response = ResponseHelper.createSingleResponse(
                    "errors", 0, e.getMessage() , null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findProductBySlug) #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Product>> findProductById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findProductById) #####");
        try{
            Product category = this.service.getProductById(id);
            PaginatedResponse.SingleResponse<Product> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", category
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Product> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findProductById) #####");
        }
    }
}
