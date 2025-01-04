package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.UserView;
import doan.ecm.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/users")
public class AdminUserController {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserController.class);

    @Autowired
    private UserService service;

    @GetMapping
    public PaginatedResponse<UserView> getListsUser(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "email", required = false, defaultValue = "") String email,
            @RequestParam(value = "phone", required = false, defaultValue = "") String phone,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsUser) [Admin] #####");
        try {
            Page<UserView> lists = this.service.getLists(page, size, name, email, phone, status);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsUser) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<UserView>> createUser(@RequestBody UserView userView) {
        logger.info("##### REQUEST RECEIVED (createUser) [Admin] #####");
        try {
            UserView newUser = service.create(userView);
            PaginatedResponse.SingleResponse<UserView> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", newUser
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createUser) [Admin] #####");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<UserView>> updateUser(
            @PathVariable Long id,
            @RequestBody UserView userView) {
        logger.info("##### REQUEST RECEIVED (updateUser) [Admin] #####");
        try {
            UserView updatedUser = service.update(id, userView);
            PaginatedResponse.SingleResponse<UserView> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updatedUser
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateUser) [Admin] #####");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<UserView>> deleteUser(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteUser) [Admin] #####");
        try {
            service.delete(id);
            PaginatedResponse.SingleResponse<UserView> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", null
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteUser) [Admin] #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<UserView>> findUserById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findUserById) [Admin] #####");
        try{
            UserView userView = service.findById(id);
            PaginatedResponse.SingleResponse<UserView> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", userView
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<UserView> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findUserById) [Admin] #####");
        }
    }
}
