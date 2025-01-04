package doan.ecm.controller.user;

import doan.ecm.auth.service.CustomUserDetailsService;
import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.dto.Request.OrderRequest;
import doan.ecm.model.Order;
import doan.ecm.model.UserView;
import doan.ecm.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/v1/users/orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService service;

    @Autowired
    private CustomUserDetailsService userService;

    @GetMapping
    public PaginatedResponse<Order> getAllOrder(
            @RequestParam(value = "code", required = false, defaultValue = "") String code,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int size) {
        logger.info("##### REQUEST RECEIVED (getAllOrder) #####");
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof UserDetails) {
                String email = ((UserDetails) principal).getUsername(); // email thay vì username
                UserView data = userService.getUserByEmail(email);
                if(data == null) {
                    return ResponseHelper.createPaginatedResponse("error", 401, "Phiên đăng nhập hết hạn", null);
                }
                Page<Order> dataResponse = this.service.getLists(code, status, data.getId(), null, null, null, page, size);
                return ResponseHelper.createPaginatedResponse("success", 0, "successfully", dataResponse);
            } else {
                return ResponseHelper.createPaginatedResponse("error", 401, "Phiên đăng nhập hết hạn", null);

            }
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getAllOrder) #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> findOrderById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findOrderById) #####");
        try {
            Order order = this.service.findById(id);
            PaginatedResponse.SingleResponse<Order> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", order
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Order> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findOrderById) #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> createOrder(@RequestBody OrderRequest orderRequest) {
        logger.info("##### REQUEST RECEIVED (createOrder) #####");
        try {
            Order order = service.create(orderRequest);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", order
            ));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createOrder) #####");
        }
    }

    @PutMapping("/update-payment-status")
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> updatePaymentStatus(
            @RequestBody Order order) {
        logger.info("##### REQUEST RECEIVED (updatePaymentStatus) #####");
        try {
            Order updatedOrder = service.updatePaymentStatus(order);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updatedOrder
            ));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 1, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updatePaymentStatus) #####");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> updateOrder(
            @PathVariable Long id,
            @RequestBody OrderRequest orderRequest) {
        logger.info("##### REQUEST RECEIVED (updateOrder) #####");
        try {
            Order order = service.update(id, orderRequest);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", order
            ));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 1, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateOrder) #####");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Order>> deleteOrder(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteOrder) #####");
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
            logger.info("##### REQUEST FINISHED (deleteOrder) #####");
        }
    }
}
