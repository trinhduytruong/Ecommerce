package doan.ecm.dto.Response.DashboardResponseDto;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class DashboardResDto {
    private Long totalUsers;
    private Long totalOrders;
    private Long totalProducts;
    private Long totalArticles;

}
