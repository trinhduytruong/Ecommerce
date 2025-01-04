package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Slide;
import doan.ecm.service.SlideService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/slides")
public class AdminSlideController {

    private static final Logger logger = LoggerFactory.getLogger(AdminSlideController.class);

    @Autowired
    private SlideService service;

    @GetMapping
    public PaginatedResponse<Slide> getListsSlide(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsSlide) [Admin] #####");
        try {
            Page<Slide> lists = this.service.getLists(page, size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsSlide) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Slide>> createSlide(@RequestBody Slide slide) {
        logger.info("##### REQUEST RECEIVED (createSlide) [Admin] #####");
        try {
            if(slide.getPage() == null || slide.getPage().isEmpty()) {
                slide.setPage("home");
            }
            if(slide.getStatus() == null || slide.getStatus().isEmpty()) {
                slide.setStatus("pending");
            }
            if(slide.getPosition() == null) {
                slide.setPosition(1);
            }
            Slide newSlide = service.create(slide);
            PaginatedResponse.SingleResponse<Slide> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", newSlide
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createSlide) [Admin] #####");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Slide>> updateSlide(
            @PathVariable Long id,
            @RequestBody Slide slide) {
        logger.info("##### REQUEST RECEIVED (updateSlide) [Admin] #####");
        try {
            if(slide.getPage() == null || slide.getPage().isEmpty()) {
                slide.setPage("home");
            }
            if(slide.getStatus() == null || slide.getStatus().isEmpty()) {
                slide.setStatus("pending");
            }
            if(slide.getPosition() == null) {
                slide.setPosition(1);
            }
            Slide updatedSlide = service.update(id, slide);
            PaginatedResponse.SingleResponse<Slide> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updatedSlide
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateSlide) [Admin] #####");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Slide>> deleteSlide(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteSlide) [Admin] #####");
        try {
            service.delete(id);
            PaginatedResponse.SingleResponse<Slide> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", null
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteSlide) [Admin] #####");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Slide>> findSlideById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findSlideById) [Admin] #####");
        try{
            Slide slide = service.findById(id);
            PaginatedResponse.SingleResponse<Slide> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", slide
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Slide> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findSlideById) [Admin] #####");
        }
    }
}
