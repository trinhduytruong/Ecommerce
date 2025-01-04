package doan.ecm.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "slides")

@Getter
@Setter

public class Slide {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(nullable = true)
    private String avatar;

    @Column(nullable = true, columnDefinition = "enum('published', 'draft', 'pending') DEFAULT 'pending'")
    private String status;

    @Column(nullable = true)
    private String page;

    @Column(nullable = true)
    private String link;

    @Column(nullable = true)
    private Integer position;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

    private Date updated_at;
}
