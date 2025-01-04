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
public class FetchUserDto {
    private Long id;
    private String name;
    private String email;
    private String joinedDate;
}
