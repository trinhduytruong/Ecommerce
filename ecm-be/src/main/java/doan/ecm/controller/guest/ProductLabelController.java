package doan.ecm.controller.guest;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.ProductLabels;
import doan.ecm.service.ProductLabelsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/product-labels")

public class ProductLabelController {

    private static final Logger logger = LoggerFactory.getLogger(ProductLabelController.class);

    @Autowired
    private ProductLabelsService service;

    @GetMapping
    public PaginatedResponse<ProductLabels> getListsProductLabels(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsProductLabels) #####");
        try {
            Page<ProductLabels> productLabelsPage = this.service.getLists(page, size, name, status);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", productLabelsPage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại",null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsProductLabels) #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<ProductLabels>> findProductLabelsById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findProductLabelsById) #####");
        try{
            ProductLabels productLabels = service.findById(id);
            PaginatedResponse.SingleResponse<ProductLabels> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", productLabels
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<ProductLabels> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findProductLabelsById) #####");
        }
    }
}
