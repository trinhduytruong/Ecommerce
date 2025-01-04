package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.dto.Request.OrderRequest;
import doan.ecm.model.Order;
import doan.ecm.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admin/order")
public class AdminOrderController {

    private static final Logger logger = LoggerFactory.getLogger(AdminOrderController.class);

    @Autowired
    private OrderService service;

    @GetMapping
    public PaginatedResponse<?> getListsOrder(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size,
            @RequestParam(value = "full_name", required = false, defaultValue = "") String full_name,
            @RequestParam(value = "phone", required = false, defaultValue = "") String phone,
            @RequestParam(value = "user_id", required = false) Long user_id,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "payment_status", required = false, defaultValue = "") String payment_status,
            @RequestParam(value = "code", required = false, defaultValue = "") String code) {
        logger.info("##### REQUEST RECEIVED (getListsOrder) [Admin] #####");
        try {
            Page<Order> lists = this.service.getLists(code, status,user_id, full_name, phone,payment_status, page, size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, e.getMessage(), null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsOrder) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> createOrder(@RequestBody OrderRequest orderRequest) {
        logger.info("##### REQUEST RECEIVED (createOrder) [Admin] #####");
        try {
            Order o = service.create(orderRequest);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", o
            ));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createOrder) [Admin] #####");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> updateOrder(
            @PathVariable Long id,
            @RequestBody OrderRequest orderRequest) {
        logger.info("##### REQUEST RECEIVED (updateOrder) [Admin] #####");
        try {
            Order o = service.update(id, orderRequest);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", o
            ));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 1, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateOrder) [Admin] #####");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> deleteOrder(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteOrder) [Admin] #####");
        try {
            service.delete(id);
            PaginatedResponse.SingleResponse<Order> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", null
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteOrder) [Admin] #####");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> findOrderById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findOrderById) [Admin] #####");
        try{
            Order modelData = service.findById(id);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", modelData
            ));
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (findOrderById) [Admin] #####");
        }
    }
}
