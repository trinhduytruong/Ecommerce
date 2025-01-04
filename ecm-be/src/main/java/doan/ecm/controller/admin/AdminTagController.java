package doan.ecm.controller.admin;

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
@RequestMapping("/api/v1/admin/tags")
public class AdminTagController {

    private static final Logger logger = LoggerFactory.getLogger(AdminTagController.class);

    @Autowired
    private TagService service;

    @GetMapping
    public PaginatedResponse<Tag> getListsTag(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsTag) [Admin] #####");
        try {
            Page<Tag> lists = this.service.getLists(page, size, name);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsTag) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Tag>> createTag(@RequestBody Tag tag) {
        logger.info("##### REQUEST RECEIVED (createTag) [Admin] #####");
        try {
            Tag newTag = service.create(tag);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", newTag
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createTag) [Admin] #####");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Tag>> updateTag(
            @PathVariable Long id,
            @RequestBody Tag tag) {
        logger.info("##### REQUEST RECEIVED (updateTag) [Admin] #####");
        try {
            Tag updatedTag = service.update(id, tag);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updatedTag
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateTag) [Admin] #####");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Tag>> deleteTag(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteTag) [Admin] #####");
        try {
            service.delete(id);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", null
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteTag) [Admin] #####");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Tag>> findTagById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findTagById) [Admin] #####");
        try{
            Tag modelData = service.findById(id);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", modelData
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Tag> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findTagById) [Admin] #####");
        }
    }
}
