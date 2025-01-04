package doan.ecm.controller.user;

import doan.ecm.auth.service.CustomUserDetailsService;
import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.dto.Request.VoteRequest;
import doan.ecm.model.UserView;
import doan.ecm.model.Vote;
import doan.ecm.service.VoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users/votes")
public class VoteController {

    private static final Logger logger = LoggerFactory.getLogger(VoteController.class);

    @Autowired
    private VoteService service;

    @Autowired
    private CustomUserDetailsService userService;

    @GetMapping
    public PaginatedResponse<Vote> getListsVote(
            @RequestParam(value = "product_id", required = false, defaultValue = "") Long product_id,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsVote) #####");
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (principal instanceof UserDetails) {
                String email = ((UserDetails) principal).getUsername(); // email thay vì username
                UserView data = userService.getUserByEmail(email);
                if(data == null) {
                    return ResponseHelper.createPaginatedResponse("error", 401, "Phiên đăng nhập hết hạn", null);
                }
                Page<Vote> dataResponse = this.service.getLists(data.getId(), product_id, status,null, null, page, size);
                return ResponseHelper.createPaginatedResponse("success", 0, "successfully", dataResponse);

            } else {
                return ResponseHelper.createPaginatedResponse("error", 401, "Phiên đăng nhập hết hạn", null);

            }
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsVote) #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Vote>> findVoteById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findVoteById) #####");
        try {
            Vote vote = this.service.findById(id);
            PaginatedResponse.SingleResponse<Vote> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", vote
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Vote> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findVoteById) #####");
        }
    }

    @PostMapping
    public PaginatedResponse.SingleResponse<Vote> createVote(@RequestBody VoteRequest voteRequest) {
        logger.info("##### REQUEST RECEIVED (createVote) #####");
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof UserDetails) {
                String email = ((UserDetails) principal).getUsername(); // email thay vì username
                UserView data = userService.getUserByEmail(email);
                if(data == null) {
                    return ResponseHelper.createSingleResponse("error", 401, "Phiên đăng nhập hết hạn", null);
                }
                voteRequest.setUser_id(data.getId());
                Vote newVote = service.create(voteRequest);
                return ResponseHelper.createSingleResponse(
                        "success", 0, "successfully", newVote
                );

            } else {
                return ResponseHelper.createSingleResponse("error", 401, "Phiên đăng nhập hết hạn", null);
            }

        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            );
        } finally {
            logger.info("##### REQUEST FINISHED (createVote) #####");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Vote>> updateVote(
            @PathVariable Long id,
            @RequestBody VoteRequest voteRequest) {
        logger.info("##### REQUEST RECEIVED (updateVote) #####");
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
            logger.info("##### REQUEST FINISHED (updateVote) #####");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Vote>> deleteVote(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteVote) #####");
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
            logger.info("##### REQUEST FINISHED (deleteVote) #####");
        }
    }
}
