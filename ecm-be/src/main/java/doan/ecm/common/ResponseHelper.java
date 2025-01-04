package doan.ecm.common;

import doan.ecm.controller.user.OrderController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;

import java.util.List;

public class ResponseHelper {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    public static <T> PaginatedResponse<T> createPaginatedResponse(String status, int errorCode, String message, Page<T> pageContent) {
        PaginatedResponse.Meta meta = new PaginatedResponse.Meta();
       if(pageContent != null) {
           meta = new PaginatedResponse.Meta(
                   pageContent.getTotalElements(),
                   pageContent.getSize(),
                   pageContent.getNumber() + 1,
                   pageContent.getTotalPages()
           );
       }

        PaginatedResponse<T> response = new PaginatedResponse<>();
        response.setStatus(status);
        response.setErrorCode(errorCode);
        response.setMessage(message);
        response.setData(new PaginatedResponse.Data<>(meta, pageContent != null ? pageContent.getContent() : null));

        return response;
    }

    public static <T> PaginatedResponse<T> createSuccessResponse(List<T> content) {
        PaginatedResponse.Meta meta = new PaginatedResponse.Meta(content.size(), content.size(), 1, 1);

        PaginatedResponse<T> response = new PaginatedResponse<>();
        response.setStatus("success");
        response.setErrorCode(0);
        response.setMessage("successfully");
        response.setData(new PaginatedResponse.Data<>(meta, content));

        return response;
    }

    public static <T> PaginatedResponse.SingleResponse<T> createSingleResponse(String status, int errorCode, String message, T content) {
        PaginatedResponse.SingleResponse<T> response = new PaginatedResponse.SingleResponse<>();
        response.setStatus(status);
        response.setErrorCode(errorCode);
        response.setMessage(message);
        response.setData(new PaginatedResponse.SingleResponse.Data<>(content));

        return response;
    }

    public static <T> PaginatedResponse.SingleResponseV2<T> createSingleResponseV2(String status, int errorCode, String message, T content) {
        PaginatedResponse.SingleResponseV2<T> response = new PaginatedResponse.SingleResponseV2<>();
        response.setStatus(status);
        response.setErrorCode(errorCode);
        response.setMessage(message);
        response.setData(content);

        return response;
    }
}
