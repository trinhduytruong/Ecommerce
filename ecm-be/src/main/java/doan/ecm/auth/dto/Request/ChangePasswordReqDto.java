package doan.ecm.auth.dto.Request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordReqDto {
    @NotNull(message = "Mật khẩu cũ không được để trống.")
    @NotBlank(message = "Mật khẩu cũ không được để trống.")
    private String old_password;

    @NotNull(message = "Mật khẩu mới không được để trống.")
    @NotBlank(message = "Mật khẩu mới không được để trống.")
    private String password;
}

