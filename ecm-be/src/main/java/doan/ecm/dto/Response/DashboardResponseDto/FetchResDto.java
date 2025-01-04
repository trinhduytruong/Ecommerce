package doan.ecm.dto.Response.DashboardResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class FetchResDto {
    private List<String> labels;
    private List<DataSetFetchResDto> datasets;
}
