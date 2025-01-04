package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.ProductLabels;
import doan.ecm.service.ProductLabelsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/product-labels")

public class AdminProductLabelsController {

    private static final Logger logger = LoggerFactory.getLogger(AdminProductLabelsController.class);

    @Autowired
    private ProductLabelsService service;

    @GetMapping
    public PaginatedResponse<ProductLabels> getListProductLabels(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListProductLabels) [Admin] #####");
        try {
            Page<ProductLabels> dataResponse = this.service.getLists(page, size, name, status);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", dataResponse);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại",null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListProductLabels) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<ProductLabels>>createProductLabels(@RequestBody ProductLabels productLabels) {
        logger.info("##### REQUEST RECEIVED (createProductLabels) [Admin] #####");
        try {
            ProductLabels createdProduct = service.create(productLabels);
            PaginatedResponse.SingleResponse<ProductLabels> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", createdProduct
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createProductLabels) [Admin] #####");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<ProductLabels>> updateProductLabels(
            @PathVariable Long id,
            @RequestBody ProductLabels productLabels) {
        logger.info("##### REQUEST RECEIVED (updateProductLabels) [Admin] #####");
        try {
            ProductLabels updatedProduct = service.update(id, productLabels);
            PaginatedResponse.SingleResponse<ProductLabels> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updatedProduct
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateProductLabels) [Admin] #####");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductLabels(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteProductLabels) [Admin] #####");
        try {
            service.delete(id);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        } finally {
            logger.info("##### REQUEST FINISHED (deleteProductLabels) [Admin] #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<ProductLabels>> findProductLabelsById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findProductLabelsById) [Admin] #####");
        try {
            ProductLabels product = service.findById(id);
            PaginatedResponse.SingleResponse<ProductLabels> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", product
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (findProductLabelsById) [Admin] #####");
        }

    }
}
