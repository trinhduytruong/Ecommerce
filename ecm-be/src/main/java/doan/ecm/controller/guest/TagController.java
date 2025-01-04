package doan.ecm.controller.guest;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Tag;
import doan.ecm.service.TagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tags")

public class TagController {

    private static final Logger logger = LoggerFactory.getLogger(TagController.class);

    @Autowired
    private TagService service;

    @GetMapping
    public PaginatedResponse<Tag> getListsTag(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsTag) #####");
        try {
            Page<Tag> tagPage = this.service.getLists(page, size, null);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", tagPage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại",null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsTag) #####");
        }
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Tag>> findTagBySlug(@PathVariable String slug) {
        logger.info("##### REQUEST RECEIVED (findTagBySlug) #####");
        try {
            Tag tag = service.findBySlug(slug);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", tag
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findTagBySlug) #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Tag>> findTagById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findTagById) #####");
        try {
            Tag tag = service.findById(id);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", tag
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findTagById) #####");
        }
    }
}
