package doan.ecm.auth.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            // Lấy JWT từ header
            final String authorizationHeader = request.getHeader("Authorization");

            String email = null;
            String jwt = null;
            
            if (!request.getRequestURI().startsWith("/api/v1/users") 
            &&  !request.getRequestURI().startsWith("/api/v1/admin")
            &&  !request.getRequestURI().startsWith("/api/v1/me")) {
                filterChain.doFilter(request, response);
                return;
            }
            
            // Kiểm tra nếu JWT nằm trong header Authorization
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                jwt = authorizationHeader.substring(7); // Cắt bỏ "Bearer " khỏi chuỗi
                email = jwtTokenUtil.extractEmail(jwt); // Sử dụng email thay vì username
            }
            System.out.println(email);

            // Nếu có email trong JWT và chưa xác thực trong SecurityContext
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

                // Kiểm tra token có hợp lệ không
                if (jwtTokenUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Thiết lập thông tin xác thực trong SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }

            filterChain.doFilter(request, response);
        } catch (io.jsonwebtoken.SignatureException ex) {
            System.out.println("err--------> " + ex.getMessage());
            ResponseEntity<Object> responseEntity = ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(createErrorResponse("Hết hạn phiên đăng nhập", HttpStatus.UNAUTHORIZED.value()));
            sendResponse(response, responseEntity);
        } catch (Exception ex) {
            // Phân loại HttpStatus dựa trên loại exception
            HttpStatus status;
            if (ex instanceof IllegalArgumentException) {
                status = HttpStatus.BAD_REQUEST;
            } else if (ex instanceof AccessDeniedException) {
                status = HttpStatus.FORBIDDEN;
            } else {
                status = HttpStatus.INTERNAL_SERVER_ERROR; // Mặc định
            }
            if(ex.getMessage().contains("JWT expired")) {
//                status = HttpStatus.UNAUTHORIZED;
            }

            // Tạo phản hồi
            ResponseEntity<Object> responseEntity = ResponseEntity
                    .status(status)
                    .body(createErrorResponse(ex.getMessage(), status.value()));

            sendResponse(response, responseEntity);
        }

    }

    private void sendResponse(HttpServletResponse response, ResponseEntity<Object> responseEntity) throws IOException {

        response.setCharacterEncoding("UTF-8");

        response.setStatus(responseEntity.getStatusCodeValue());
        response.setContentType("application/json");
        ObjectMapper objectMapper = new ObjectMapper();
        String responseBody = objectMapper.writeValueAsString(responseEntity.getBody());
        response.getWriter().write(responseBody);
        response.getWriter().flush();
    }

    private Map<String, Object> createErrorResponse(String message, int code) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "error");
        response.put("code", code);
        response.put("message", message);
        return response;
    }
}

