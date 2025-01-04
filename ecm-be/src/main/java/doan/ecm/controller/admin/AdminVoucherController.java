package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Voucher;
import doan.ecm.service.MenuService;
import doan.ecm.service.VoucherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/vouchers")
public class AdminVoucherController {

    private static final Logger logger = LoggerFactory.getLogger(AdminVoucherController.class);

    @Autowired
    private VoucherService service;

    @Autowired
    private MenuService menuService;

    @GetMapping
    public PaginatedResponse<Voucher> getListsVoucher(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int page_size,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "type", required = false, defaultValue = "") String type,
            @RequestParam(value = "status", required = false, defaultValue = "") String status) {
        logger.info("##### REQUEST RECEIVED (getListsVoucher) [Admin] #####");
        try {
            Page<Voucher> lists = this.service.getLists(name, status, type, page, page_size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsVoucher) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Voucher>> createVoucher(@RequestBody Voucher voucher) {
        logger.info("##### REQUEST RECEIVED (createVoucher) [Admin] #####");
        try {
            Voucher newVoucher = service.create(voucher);
            PaginatedResponse.SingleResponse<Voucher> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", newVoucher
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createVoucher) [Admin] #####");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Voucher>> updateVoucher(
            @PathVariable Long id,
            @RequestBody Voucher voucher) {
        logger.info("##### REQUEST RECEIVED (updateVoucher) [Admin] #####");
        try {
            Voucher updatedVoucher = service.update(id, voucher);
            PaginatedResponse.SingleResponse<Voucher> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updatedVoucher
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateVoucher) [Admin] #####");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Voucher>> deleteVoucher(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteVoucher) [Admin] #####");
        try {
            service.delete(id);
            PaginatedResponse.SingleResponse<Voucher> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", null
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteVoucher) [Admin] #####");
        }

    }
    @GetMapping("/code/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Voucher>> findVoucherByCode(@PathVariable String code) {
        logger.info("##### REQUEST RECEIVED (findVoucherByCode) [Admin] #####");
        try{
            Voucher voucher = service.findByCode(code);
            PaginatedResponse.SingleResponse<Voucher> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", voucher
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Voucher> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findVoucherByCode) [Admin] #####");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Voucher>> findVoucherById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findVoucherById) [Admin] #####");
        try{
            Voucher voucher = service.findById(id);
            PaginatedResponse.SingleResponse<Voucher> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", voucher
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Voucher> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findVoucherById) [Admin] #####");
        }
    }


}
