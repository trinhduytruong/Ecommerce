package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Brand;
import doan.ecm.service.BrandService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/brands")
public class AdminBrandController {

    private static final Logger logger = LoggerFactory.getLogger(AdminBrandController.class);

    @Autowired
    private BrandService service;


    @GetMapping
    public PaginatedResponse<Brand> getListsBrand(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsBrand) [Admin] #####");
        try {
            Page<Brand> lists = this.service.getLists(name, status, page, size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsBrand) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Brand>> createBrand(@RequestBody Brand brand) {
        logger.info("##### REQUEST RECEIVED (createBrand) [Admin] #####");
        try {
            Brand dataCreate = service.create(brand);
            PaginatedResponse.SingleResponse<Brand> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", dataCreate
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createBrand) [Admin] #####");
        }


    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Brand>> updateBrand(
            @PathVariable Long id,
            @RequestBody Brand brand) {
        logger.info("##### REQUEST RECEIVED (updateBrand) [Admin] #####");
        try {
            Brand updateModel = service.update(id, brand);
            PaginatedResponse.SingleResponse<Brand> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updateModel
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateBrand) [Admin] #####");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteBrand) [Admin] #####");
        try {
            service.delete(id);
            return ResponseEntity.ok("Brand deleted successfully");
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        } finally {
            logger.info("##### REQUEST FINISHED (deleteBrand) [Admin] #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Brand>> findBrandById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findBrandById) [Admin] #####");
        try{
            Brand modelData = service.findById(id);
            PaginatedResponse.SingleResponse<Brand> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", modelData
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Brand> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findBrandById) [Admin] #####");
        }
    }
}
