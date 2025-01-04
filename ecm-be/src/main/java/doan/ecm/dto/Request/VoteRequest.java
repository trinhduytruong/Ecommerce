package doan.ecm.dto.Request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class VoteRequest {
    private Long user_id;
    private Long product_id;
    private int rating;
    private String status;
    private String comment;
}



