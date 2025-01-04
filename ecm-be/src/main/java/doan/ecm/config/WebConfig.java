package doan.ecm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Định nghĩa đường dẫn API
                .allowedOriginPatterns("*") // Cho phép từ domain ReactJS
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Phương thức HTTP được phép
                .allowedHeaders("*") // Tất cả các headers được phép
                .allowCredentials(true); // Cho phép sử dụng cookies nếu cần
    }
}
