package doan.ecm.controller.guest;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Brand;
import doan.ecm.service.BrandService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/brands")

public class BrandController {

    private static final Logger logger = LoggerFactory.getLogger(BrandController.class);

    @Autowired
    private BrandService service;

    @GetMapping
    public PaginatedResponse<Brand> getListsBrand(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsBrand) #####");
        try {
            Page<Brand> brandPage = this.service.getLists(name, status, page, size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", brandPage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại",null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsBrand) #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Brand>> findBrandById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findBrandById) #####");
        try{
            Brand brand = service.findById(id);
            PaginatedResponse.SingleResponse<Brand> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", brand
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Brand> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findBrandById) #####");
        }
    }
}
