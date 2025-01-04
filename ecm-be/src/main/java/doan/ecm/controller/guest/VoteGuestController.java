package doan.ecm.controller.guest;

import doan.ecm.auth.service.CustomUserDetailsService;
import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Vote;
import doan.ecm.service.VoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/votes")
public class VoteGuestController {
    private static final Logger logger = LoggerFactory.getLogger(VoteGuestController.class);

    @Autowired
    private VoteService service;

    @Autowired
    private CustomUserDetailsService userService;

    @GetMapping
    public PaginatedResponse<Vote> getListsVote(
            @RequestParam(value = "product_id", required = false) Long product_id,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsVote) #####");
        try {
            Page<Vote> votePage = this.service.getLists(null, product_id, status,null, null, page, size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", votePage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsVote) #####");
        }
    }
}
