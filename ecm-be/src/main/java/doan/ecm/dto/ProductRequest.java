package doan.ecm.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Setter
@Getter
public class ProductRequest {
    private String name;
    private String slug;
    private String status;
    private Integer number;
    private Integer sale;
    private Integer price;
    private Double height;
    private Double length;
    private Double width;
    private Long categoryId;
    private Long brand;
    private String avatar;
    private String description;
    private String contents;
    private List<String> images;
    private Set<Long> productsLabels;

    @Override
    public String toString() {
        return "ProductRequest{" +
                "name='" + name + '\'' +
                ", slug='" + slug + '\'' +
                ", sale=" + sale +
                ", avatar='" + avatar + '\'' +
                ", categoryId=" + categoryId +
                ", productsLabels=" + productsLabels +
                '}';
    }
}
