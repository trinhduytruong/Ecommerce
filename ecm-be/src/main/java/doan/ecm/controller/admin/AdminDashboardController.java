package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.service.DashboardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/v1/admin/dashboard")
public class AdminDashboardController {

    private static final Logger logger = LoggerFactory.getLogger(AdminDashboardController.class);

    @Autowired
    private DashboardService service;


    @GetMapping
    public PaginatedResponse.SingleResponseV2<?> getDashboard() {
        logger.info("##### REQUEST RECEIVED (getDashboard) [Admin] #####");
        try {
            var response = this.service.getDashboardTotal();
            return ResponseHelper.createSingleResponseV2("success", 0, "successfully", response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createSingleResponseV2("errors", 0, e.getMessage(), null);
        } finally {
            logger.info("##### REQUEST FINISHED (getDashboard) [Admin] #####");
        }
    }

    @GetMapping("/fetch-order-news")
    public PaginatedResponse.SingleResponseV2<?> fetchOrderNews(
            @RequestParam(value = "page_size", required = false, defaultValue = "10") String size) {
        logger.info("##### REQUEST RECEIVED (fetchOrderNews) [Admin] #####");
        try {
            var response = this.service.fetchOrderNews(size);
            return ResponseHelper.createSingleResponseV2("success", 0, "successfully", response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createSingleResponseV2("errors", 0, e.getMessage(), null);
        } finally {
            logger.info("##### REQUEST FINISHED (fetchOrderNews) [Admin] #####");
        }
    }

    @GetMapping("/fetch-monthly-revenue")
    public PaginatedResponse.SingleResponseV2<?> fetchMonthlyRevenue() {
        logger.info("##### REQUEST RECEIVED (fetchMonthlyRevenue) [Admin] #####");
        try {
            var response = this.service.getMonthlyRevenue();
            return ResponseHelper.createSingleResponseV2("success", 0, "successfully", response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createSingleResponseV2("errors", 0, e.getMessage(), null);
        } finally {
            logger.info("##### REQUEST FINISHED (fetchMonthlyRevenue) [Admin] #####");
        }
    }

    @GetMapping("/fetch-user-news")
    public PaginatedResponse.SingleResponseV2<?> fetchUserNews(
            @RequestParam(value = "page_size", required = false, defaultValue = "10") String size) {
        logger.info("##### REQUEST RECEIVED (fetchUserNews) [Admin] #####");
        try {
            var response = this.service.fetchUserNews(size);
            return ResponseHelper.createSingleResponseV2("success", 0, "successfully", response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createSingleResponseV2("errors", 0, e.getMessage(), null);
        } finally {
            logger.info("##### REQUEST FINISHED (fetchUserNews) [Admin] #####");
        }
    }

    @GetMapping("/fetch-daily-revenue")
    public PaginatedResponse.SingleResponseV2<?> fetchDailyRevenue(
            @RequestParam(value = "month", required = false, defaultValue = "") String month,
            @RequestParam(value = "year", required = false, defaultValue = "") String year) {
        logger.info("##### REQUEST RECEIVED (fetchDailyRevenue) [Admin] #####");
        try {

            var response = this.service.getDailyRevenue(month, year);
            return ResponseHelper.createSingleResponseV2("success", 0, "successfully", response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createSingleResponseV2("errors", 0, e.getMessage(), null);
        } finally {
            logger.info("##### REQUEST FINISHED (fetchDailyRevenue) [Admin] #####");
        }
    }


}
