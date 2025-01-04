package doan.ecm.model;

import doan.ecm.common.ListToJsonConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ec_products")

@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String slug;

    @Column(nullable = true)
    private String avatar;

    @Column(nullable = true)
    private String status;

    @Column(nullable = true)
    private String description;

    @Column(name = "contents", nullable = true)
    private String contents;

    @Column(nullable = true) // SQL column type is JSON
    @Convert(converter = ListToJsonConverter.class)
    private List<String> images;

    @Column(nullable = true)
    private Integer sale;

    @Column(nullable = true)
    private Integer number;

//    @Column(nullable = true)
//    @DE
//    private Double length;
//
//    @Column(nullable = true)
//    private Double width;

    @Column(nullable = true)
    private Integer price;

    @Column(nullable = true)
    private Integer total_vote_count;

    @Column(nullable = true)
    private Integer total_rating_score;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date created_at;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date updated_at;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne()
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToMany()
    @JoinTable(
            name = "ec_products_labels",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "product_label_id")
    )
    private Set<ProductLabels> labels;


}
