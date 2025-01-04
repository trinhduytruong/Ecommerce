package doan.ecm.controller.guest;

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

@RestController
@RequestMapping("/api/v1/menus")

public class MenuController {

    private static final Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    private MenuService service;

    @GetMapping
    public PaginatedResponse<Menu> getListsMenu(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getListsMenu) #####");
        try {
            Page<Menu> menuPage = this.service.getLists(page, size, null);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", menuPage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại",null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsMenu) #####");
        }
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Menu>> findMenuBySlug(@PathVariable String slug) {
        logger.info("##### REQUEST RECEIVED (findMenuBySlug) #####");
        try{
            Menu menu = service.findBySlug(slug);
            PaginatedResponse.SingleResponse<Menu> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", menu
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Menu> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findMenuBySlug) #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Menu>> findMenuById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findMenuById) #####");
        try{
            Menu menu = service.findById(id);
            PaginatedResponse.SingleResponse<Menu> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", menu
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Menu> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findMenuById) #####");
        }
    }
}
