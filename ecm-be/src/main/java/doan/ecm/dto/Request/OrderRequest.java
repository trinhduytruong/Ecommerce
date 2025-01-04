package doan.ecm.dto.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
public class OrderRequest {
    private Long user_id;
    private Long payment_method_id;
    private String address;
    private BigDecimal shipping_fee;
    private String payment_status;
    private String status;
    private String coupon_code;
    private BigDecimal total_amount;
    private BigDecimal tax_amount;
    private BigDecimal discount_amount;
//    private Double sub_total;
    private String completed_at;
    private String notes;
    private List<ProductData> products;


    @Setter
    @Getter
    public static  class ProductData {
        @JsonProperty("id")
        private Long id;

        @JsonProperty("quantity")
        private int quantity;
    }
}



