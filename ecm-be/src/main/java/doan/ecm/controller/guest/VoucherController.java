package doan.ecm.controller.guest;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Voucher;
import doan.ecm.service.VoucherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vouchers")
public class VoucherController {

    private static final Logger logger = LoggerFactory.getLogger(VoucherController.class);

    @Autowired
    private VoucherService service;

    @GetMapping
    public PaginatedResponse<Voucher> getListsVoucher(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int page_size,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "type", required = false, defaultValue = "") String type,
            @RequestParam(value = "status", required = false, defaultValue = "") String status) {
        logger.info("##### REQUEST RECEIVED (getListsVoucher) #####");
        try {
            Page<Voucher> lists = this.service.getLists(name, status, type, page, page_size);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsVoucher) #####");
        }
    }

    @GetMapping("/code/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Voucher>> findVoucherByCode(@PathVariable String code) {
        logger.info("##### REQUEST RECEIVED (findVoucherByCode) #####");
        try {
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
            logger.info("##### REQUEST FINISHED (findVoucherByCode) #####");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Voucher>> findVoucherById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findVoucherById) #####");
        try {
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
            logger.info("##### REQUEST FINISHED (findVoucherById) #####");
        }
    }


}
