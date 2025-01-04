package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Menu;
import doan.ecm.service.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admin/menus")
public class AdminMenuController {

    private static final Logger logger = LoggerFactory.getLogger(AdminMenuController.class);

    @Autowired
    private MenuService service;


    @GetMapping
    public PaginatedResponse<Menu> getListsMenu(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsMenu) [Admin] #####");
        try {
            Page<Menu> lists = this.service.getLists(page, size, name);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsMenu) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Menu>> createMenu(@RequestBody Menu menu) {
        logger.info("##### REQUEST RECEIVED (createMenu) [Admin] #####");
        try {
            menu.setStatus(menu.getStatus() != null ? menu.getStatus() : "published");
            Menu dataCreate = service.create(menu);
            PaginatedResponse.SingleResponse<Menu> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", dataCreate
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createMenu) [Admin] #####");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Menu>> updateMenu(
            @PathVariable Long id,
            @RequestBody Menu menu) {
        logger.info("##### REQUEST RECEIVED (updateMenu) [Admin] #####");
        try {
            Menu updateModel = service.update(id, menu);
            PaginatedResponse.SingleResponse<Menu> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updateModel
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateMenu) [Admin] #####");
        }


    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Menu>> deleteMenu(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteMenu) [Admin] #####");
        try {
            service.delete(id);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0,"successfully", null
            ));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteMenu) [Admin] #####");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Menu>> findMenuById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findMenuById) [Admin] #####");
        try{
            Menu modelData = service.findById(id);
            PaginatedResponse.SingleResponse<Menu> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", modelData
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Menu> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findMenuById) [Admin] #####");
        }
    }
}
