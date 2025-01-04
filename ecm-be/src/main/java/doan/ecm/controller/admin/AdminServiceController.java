package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.dto.Request.ServiceRequestDto;
import doan.ecm.model.ServiceModel;
import doan.ecm.service.ServiceModelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admin/services")
public class AdminServiceController {

    private static final Logger logger = LoggerFactory.getLogger(AdminServiceController.class);

    @Autowired
    private ServiceModelService service;


    @GetMapping
    public PaginatedResponse<?> getListsService(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsService) [Admin] #####");
        try {
            Page<ServiceModel> serviceLists = this.service.getLists(page, size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", serviceLists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, e.getMessage(), null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsService) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<?> createService(@RequestBody ServiceRequestDto serviceRequestDto) {
        logger.info("##### REQUEST RECEIVED (createService) [Admin] #####");
        try {
            ServiceModel serviceModel = service.create(serviceRequestDto);
            PaginatedResponse.SingleResponse<ServiceModel> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", serviceModel
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        } finally {
            logger.info("##### REQUEST FINISHED (createService) [Admin] #####");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<ServiceModel>> updateService(
            @PathVariable Long id,
            @RequestBody ServiceRequestDto serviceRequestDto) {
        logger.info("##### REQUEST RECEIVED (updateService) [Admin] #####");
        try {
            ServiceModel serviceModel = service.update(id, serviceRequestDto);
            PaginatedResponse.SingleResponse<ServiceModel> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", serviceModel
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<ServiceModel> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (updateService) [Admin] #####");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<ServiceModel>> deleteService(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteService) [Admin] #####");
        try {
            service.delete(id);
            PaginatedResponse.SingleResponse<ServiceModel> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", null
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteService) [Admin] #####");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<ServiceModel>> findServiceById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findServiceById) [Admin] #####");
        try{
            ServiceModel serviceModel = service.findById(id);
            PaginatedResponse.SingleResponse<ServiceModel> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", serviceModel
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<ServiceModel> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findServiceById) [Admin] #####");
        }
    }
}
