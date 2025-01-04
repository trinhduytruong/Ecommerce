package doan.ecm.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "ec_vouchers")

@Getter
@Setter

public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String code;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false, columnDefinition = "enum('pending', 'published', 'draft') DEFAULT 'published'")
    private String status;

    @Column(nullable = true, columnDefinition = "enum('percent', 'fix') DEFAULT 'fix'")
    private String type;

    @Column(nullable = true)
    private Double price;

    @Column(nullable = true)
    private int total_used;

    @Column(nullable = true)
    private int max_used;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date updated_at;

}
