package doan.ecm.auth.dto.Request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgetPasswordRequest {
    @NotNull(message = "Email không được để trống.")
    @NotBlank(message = "Email không được để trống.")
    private String email;
}

