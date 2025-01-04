package doan.ecm.dto.Request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class ServiceRequestDto {
    private String name;
    private String slug;
    private String status;
    private String description;
    private int is_home_service;
    private int price;
}
