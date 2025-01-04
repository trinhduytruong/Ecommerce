package doan.ecm.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Entity
@Table(name = "votes")

@Getter
@Setter


public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "enum('published', 'draft', 'pending') DEFAULT 'pending'")
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date updated_at;

    @Column(name="rating", nullable = true, columnDefinition = "DEFAULT 0")
    private int rating;

    @Lob
    @Column(nullable = true)
    private String comment;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserView user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}
