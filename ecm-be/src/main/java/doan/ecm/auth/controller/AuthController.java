package doan.ecm.auth.controller;

import doan.ecm.auth.dto.Request.ForgetPasswordRequest;
import doan.ecm.auth.dto.Request.ResetPasswordRequest;
import doan.ecm.auth.dto.Response.AuthResponse;
import doan.ecm.auth.dto.Request.LoginRequest;
import doan.ecm.auth.dto.Request.RegisterRequest;
import doan.ecm.auth.helpers.ResponseHelper;
import doan.ecm.auth.helpers.StandardResponse;
import doan.ecm.auth.service.AuthService;
import doan.ecm.controller.user.OrderController;
import doan.ecm.model.UserView;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<StandardResponse<AuthResponse>> register(@RequestBody RegisterRequest registerRequest) {
        logger.info("##### REQUEST RECEIVED (Register) #####");
        try {
            AuthResponse token = authService.register(registerRequest);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("success", 0, "Registered successfully", token));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("error", -1, e.getMessage(), null));
        } finally {
            logger.info("##### REQUEST FINISHED (Register) #####");
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<StandardResponse<UserView>> forgetPassword(@Valid @RequestBody ForgetPasswordRequest registerRequest) {
        logger.info("##### REQUEST RECEIVED (ForgetPassword) #####");
        try {
            UserView token = authService.forgotPassword(registerRequest);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("success", 0, "Successfully", token));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("error", -1, e.getMessage(), null));
        } finally {
            logger.info("##### REQUEST FINISHED (ForgetPassword) #####");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<StandardResponse<Optional<AuthResponse>>> changePassword(@RequestBody ResetPasswordRequest requestDto) {
        logger.info("##### REQUEST RECEIVED (ChangePassword) #####");
        try {
            Optional<AuthResponse> token = authService.resetPassword(requestDto);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("success", 0, "Successfully", token));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("error", -1, e.getMessage(), null));
        } finally {
            logger.info("##### REQUEST FINISHED (ChangePassword) #####");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<StandardResponse<Optional<AuthResponse>>> login(@RequestBody LoginRequest loginRequest) {
        logger.info("##### REQUEST RECEIVED (Login) #####");
        try {
            Optional<AuthResponse> dataResponse = authService.login(loginRequest);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("success", 0, "Login successfully", dataResponse));
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createStandardResponse("error", -1, e.getMessage(), null));
        } finally {
            logger.info("##### REQUEST FINISHED (Login) #####");
        }
    }
}
