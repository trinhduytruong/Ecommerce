package doan.ecm.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter

public class ArticleRequest {
    private String name;
    private String slug;
    private String status;
    private String description;
    private int isFeatured;
    private int views;
    private String avatar;
    private String content;
    private Long menuId;
    private Set<Long> tags;
}
