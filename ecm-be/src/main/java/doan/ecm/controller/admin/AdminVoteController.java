package doan.ecm.controller.admin;

import doan.ecm.auth.service.CustomUserDetailsService;
import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.dto.Request.VoteRequest;
import doan.ecm.model.Vote;
import doan.ecm.service.VoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/vote")
public class AdminVoteController {

    private static final Logger logger = LoggerFactory.getLogger(AdminVoteController.class);

    @Autowired
    private VoteService service;

    @Autowired
    private CustomUserDetailsService userService;

    @GetMapping
    public PaginatedResponse<Vote> getListVote(
            @RequestParam(value = "product_id", required = false) Long product_id,
            @RequestParam(value = "product_name", required = false, defaultValue = "") String product_name,
            @RequestParam(value = "full_name", required = false, defaultValue = "") String full_name,
            @RequestParam(value = "user_id", required = false) Long user_id,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListVote) [Admin] #####");
        try {
            Page<Vote> dataResponse = this.service.getLists(user_id, product_id, status, product_name, full_name, page, size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", dataResponse);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListVote) [Admin] #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Vote>> findVoteById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findVoteById) [Admin] #####");
        try{
            Vote order = this.service.findById(id);
            PaginatedResponse.SingleResponse<Vote> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", order
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Vote> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findVoteById) [Admin] #####");
        }
    }

    @PostMapping
    public PaginatedResponse.SingleResponse<Vote> createVote(@RequestBody VoteRequest voteRequest) {
        logger.info("##### REQUEST RECEIVED (createVote) [Admin] #####");
        try {
            Vote newVote = service.create(voteRequest);
            return ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", newVote
            );

        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            );
        } finally {
            logger.info("##### REQUEST FINISHED (createVote) [Admin] #####");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Vote>> updateVote(
            @PathVariable Long id,
            @RequestBody VoteRequest voteRequest) {
        logger.info("##### REQUEST RECEIVED (updateVote) [Admin] #####");
        try {
            Vote updatedVote = service.update(id, voteRequest);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updatedVote
            ));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 1, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateVote) [Admin] #####");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Vote>> deleteVote(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteVote) [Admin] #####");
        try {
            service.delete(id);
            PaginatedResponse.SingleResponse<Vote> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", null
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteVote) [Admin] #####");
        }
    }
}
