package doan.ecm.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "users")

@Getter
@Setter

public class UserView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = true)
    private String phone;

    @Column(nullable = true)
    private String password;

    @Column(nullable = true)
    private int status;

    @Column(nullable = true)
    private String avatar;

    @Column(nullable = true)
    private String provider;

    @Column(nullable = true)
    private String remember_token;

    @Column(nullable = true, columnDefinition = "enum('USER', 'ADMIN') DEFAULT 'USER'")
    private String user_type;

    @Column(nullable = true)
    private String provider_id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private Date email_verified_at;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date created_at;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date updated_at;
}
