package doan.ecm.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "ec_orders")

@Getter
@Setter


public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String code;

    @Column(nullable = false, columnDefinition = "enum('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending'")
    private String status;

    @Column(nullable = true, columnDefinition = "enum('pending', 'completed', 'refunding', 'refunded') DEFAULT 'pending'")
    private String payment_status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

    private Date updated_at;

    @Column(name="total_shipping_fee", nullable = true, precision = 16, scale = 2, columnDefinition = "DEFAULT 0")
    private BigDecimal total_shipping_fee;

    @Column(name="amount", nullable = true, precision = 16, scale = 2, columnDefinition = "DEFAULT 0")
    private BigDecimal amount;

    @Column(name="shipping_amount", nullable = true, precision = 16, scale = 2, columnDefinition = "DEFAULT 0")
    private BigDecimal shipping_amount;

    @Column(name="tax_amount", nullable = true, precision = 16, scale = 2, columnDefinition = "DEFAULT 0")
    private BigDecimal tax_amount;

    @Column(name="discount_amount", nullable = true, precision = 16, scale = 2, columnDefinition = "DEFAULT 0")
    private BigDecimal discount_amount;

    @Column(name="sub_total", nullable = true, precision = 16, scale = 2, columnDefinition = "DEFAULT 0")
    private BigDecimal sub_total;

    @Column(nullable = true)
    private String coupon_code;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private Date completed_at;

    @Column(nullable = true)
    private String notes;

    @Column(nullable = true)
    private long payment_method_id;

    @Column(nullable = true)
    private String address;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
//    @JsonIgnore
    private UserView user;

//    @ManyToOne
//    @JoinColumn(name = "payment_method_id", nullable = false)
////    @JsonIgnore
//    private PaymentMethod paymentMethod;

    // Thêm liên kết với Transaction
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactions;
}
