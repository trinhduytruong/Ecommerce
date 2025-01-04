package doan.ecm.dto.Response.DashboardResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class FetchOrderDto {
    private Long id;
    private String code;
    private String customer;
    private String totalAmount;
    private String date;
}
