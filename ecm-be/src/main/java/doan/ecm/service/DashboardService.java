package doan.ecm.service;

import doan.ecm.auth.repository.UserRepository;
import doan.ecm.dto.Response.DashboardResponseDto.*;
import doan.ecm.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.YearMonth;
import java.util.*;

@Service
public class DashboardService {

    private static final Logger logger = LoggerFactory.getLogger(DashboardService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ArticleRepository articleRepository;

    public DashboardResDto getDashboardTotal() {
        try {
            Long totalUsers = userRepository.count();
            Long totalOrders = orderRepository.count();
            Long totalProducts = productRepository.count();
            Long totalArticles = articleRepository.count();
            DashboardResDto dashboardResDto = new DashboardResDto(totalUsers, totalOrders, totalProducts, totalArticles);
            logger.info("Dashboard data: " + dashboardResDto);
            return dashboardResDto;
        } catch (Exception e){
            logger.error("DashboardService.getDashboardTotal(): ", e);
            throw new RuntimeException("Failed to fetch dashboard", e);
        }
    }

    public FetchResDto getMonthlyRevenue() {
        try {
            List<Object[]> monthRevenues = orderRepository.getMonthlyRevenue();

            List<String> labels = Arrays.asList("January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October", "November", "December");
            DataSetFetchResDto datasets = new DataSetFetchResDto("Revenue", new ArrayList<>(Collections.nCopies(12, 0L)));
            if(!monthRevenues.isEmpty()) {
                for (Object[] data: monthRevenues) {
                    int monthIndex = ((Integer) data[0]) - 1;
                    Long revenue = ((Number) data[1]).longValue();
                    datasets.getData().set(monthIndex, revenue);
                }
            }
            logger.info("monthRevenues: " + monthRevenues);
            return new FetchResDto(labels, Arrays.asList(datasets));
        } catch (Exception e){
            logger.error("DashboardService.getMonthlyRevenue(): ", e);
            throw new RuntimeException("Failed to fetch MonthlyRevenue", e);
        }
    }

    public FetchResDto getDailyRevenue(String month, String year) {
        try {
            YearMonth currentYearMonth = YearMonth.now();  // Lấy năm và tháng hiện tại
            int yearData = currentYearMonth.getYear();  // Lấy năm
            int monthData = currentYearMonth.getMonthValue();
            if(month.isEmpty()) {
                month = monthData + "";
            }
            if(year.isEmpty()) {
                year = yearData + "";
            }
            List<Object[]> revenues = orderRepository.getDailyRevenue(month, year);
            YearMonth yearMonth = YearMonth.of(Integer.parseInt(year), Integer.parseInt(month));
            int daysInMonth = yearMonth.lengthOfMonth();

            List<String> labels = new ArrayList<>();
            for (int i = 1; i <= daysInMonth; i++) {
                labels.add(i + "");  // Các ngày trong tháng từ 1 đến daysInMonth
            }

            List<Long> dailyRevenue = new ArrayList<>();
            for (int i = 0; i < daysInMonth; i++) {
                dailyRevenue.add(0L);  // Khởi tạo doanh thu cho mỗi ngày = 0
            }

            // Tạo đối tượng DailyRevenueData để trả về
            DataSetFetchResDto datasets = new DataSetFetchResDto("Daily Revenue", dailyRevenue);
            if(!revenues.isEmpty()) {
                for (Object[] data: revenues) {
                    int index = ((Integer) data[0]) - 1;
                    Long value = ((Number) data[1]).longValue();
                    datasets.getData().set(index, value);
                }
            }
            logger.info("revenues: " + revenues);
            return new FetchResDto(labels, Arrays.asList(datasets));
        } catch (Exception e){
            logger.error("DashboardService.getDailyRevenue(): ", e);
            throw new RuntimeException("Failed to fetch DailyRevenue", e);
        }
    }

    public List<FetchUserDto> fetchUserNews(String page_size) {
        try {
            List<Object[]> results = userRepository.getNewUser(Integer.parseInt(page_size));
            List<FetchUserDto> data = new ArrayList<>();
            for (Object[] item: results) {
                if (item.length > 3 && item[3] instanceof Timestamp) {
                    Timestamp timestamp = (Timestamp) item[3]; // Trường Timestamp tại chỉ mục 4
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    String formattedDate = dateFormat.format(timestamp); // Chuyển đổi Timestamp thành String

                    // Tạo đối tượng FetchUserDto
                    FetchUserDto dataItem = new FetchUserDto(
                            (Long) item[0],  // Giả sử trường ở chỉ mục 0 là Long
                            (String) item[1],  // Trường ở chỉ mục 1 là String
                            (String) item[2],  // Trường ở chỉ mục 2 là String
                            formattedDate // Trường đã định dạng thời gian
                    );

                    data.add(dataItem);
                } else {
                    // Nếu item[4] không tồn tại hoặc không phải là Timestamp, có thể xử lý ở đây
                    // Ví dụ: Gán thời gian mặc định hoặc bỏ qua
                    FetchUserDto dataItem = new FetchUserDto(
                            (Long) item[0],
                            (String) item[1],
                            (String) item[2],
                            null
                    );
                    data.add(dataItem);
                }
            }

            logger.info("List users: " + data);
            return data;
        } catch (Exception e){
            logger.error("DashboardService.fetchUserNews(): ", e);
            throw new RuntimeException("Failed to fetch Users", e);
        }
    }

    public List<FetchOrderDto> fetchOrderNews(String page_size) {
        try{
            List<Object[]> results = orderRepository.getNewOrder(Integer.parseInt(page_size));
            List<FetchOrderDto> data = new ArrayList<>();
            for (Object[] item: results) {
                if (item.length > 4 && item[4] instanceof Timestamp) {
                    Timestamp timestamp = (Timestamp) item[4]; // Trường Timestamp tại chỉ mục 4
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    String formattedDate = dateFormat.format(timestamp); // Chuyển đổi Timestamp thành String

                    // Tạo đối tượng FetchUserDto
                    FetchOrderDto dataItem = new FetchOrderDto(
                            (Long) item[0],  // Giả sử trường ở chỉ mục 0 là Long
                            (String) item[1],  // Trường ở chỉ mục 1 là String
                            (String) item[2],  // Trường ở chỉ mục 2 là String
                            new BigDecimal(String.valueOf(item[3])).toString(),

                            formattedDate // Trường đã định dạng thời gian
                    );

                    data.add(dataItem);
                } else {
                    // Nếu item[4] không tồn tại hoặc không phải là Timestamp, bạn có thể xử lý ở đây
                    // Ví dụ: Gán thời gian mặc định hoặc bỏ qua
                    FetchOrderDto dataItem = new FetchOrderDto(
                            (Long) item[0],
                            (String) item[1],
                            (String) item[2],
                            new BigDecimal(String.valueOf(item[3])).toString(),
                            null
                    );
                    data.add(dataItem);
                }

            }

            logger.info("List orders: " + data);
            return data;
        } catch (Exception e){
            logger.error("DashboardService.fetchOrderNews(): ", e);
            throw new RuntimeException("Failed to fetch order", e);
        }
    }



}
