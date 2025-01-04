package doan.ecm.auth.controller;

import doan.ecm.auth.dto.Request.ChangePasswordReqDto;
import doan.ecm.auth.helpers.ResponseHelper;
import doan.ecm.auth.helpers.StandardResponse;
import doan.ecm.auth.service.AuthService;
import doan.ecm.auth.service.CustomUserDetailsService;
import doan.ecm.model.UserView;
import doan.ecm.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/me")
public class MeController {

    private static final Logger logger = LoggerFactory.getLogger(MeController.class);

    @Autowired
    private CustomUserDetailsService userService;

    @Autowired
    private UserService userProfileService;

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @GetMapping
    public ResponseEntity<StandardResponse<UserView>> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername(); // email thay vì username
            UserView data = userService.getUserByEmail(email);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("success", 0, "User details fetched successfully", data));
        } else {
            return ResponseEntity.status(401).body(ResponseHelper.createStandardResponse("error", -1, "No user is logged in", null));
        }
    }

    @PutMapping
    public ResponseEntity<StandardResponse<UserView>> updateProfile(@RequestBody UserView u) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername(); // email thay vì username
            UserView user = userService.getUserByEmail(email);

            UserView data = userProfileService.updateProfile(user.getId(), u);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("success", 0, "User details fetched successfully", data));
        } else {
            return ResponseEntity.status(401).body(ResponseHelper.createStandardResponse("error", -1, "No user is logged in", null));
        }
    }


    @PutMapping("/change-password")
    public ResponseEntity<StandardResponse<UserView>> changePassword(@RequestBody ChangePasswordReqDto requestDto) {
        logger.info("##### REQUEST RECEIVED (changePassword) #####");
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (principal instanceof UserDetails) {
                String email = ((UserDetails) principal).getUsername(); // email thay vì username
                UserView data = userService.getUserByEmail(email);

                if( ! passwordEncoder.matches(requestDto.getOld_password(), data.getPassword())) {
                    throw new RuntimeException("Mật khẩu không chính xác.");
                }
                data.setPassword(passwordEncoder.encode(requestDto.getPassword()));
                UserView result = userProfileService.updateProfile(data.getId(), data);
                return ResponseEntity.ok(ResponseHelper.createStandardResponse("success", 0, "successfully", data));
            } else {
                return ResponseEntity.status(401).body(ResponseHelper.createStandardResponse("error", -1, "Phiên đăng nhập hết hạn", null));
            }
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("error", -1, e.getMessage(), null));
        } finally {
            logger.info("##### REQUEST FINISHED (changePassword) #####");
        }
    }
}
