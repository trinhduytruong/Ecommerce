package doan.ecm.auth.helpers;

public class ResponseHelper {

    public static <T> StandardResponse<T> createStandardResponse(String status, int errorCode, String message, T data) {
        StandardResponse<T> response = new StandardResponse<>();
        response.setStatus(status);
        response.setErrorCode(errorCode);
        response.setMessage(message);
        response.setData(data);
        return response;
    }
}

