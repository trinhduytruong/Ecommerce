package doan.ecm.auth.dto.Request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String password;
    private String email;
    private String phone;
    public String name;
    public String user_type;
}

