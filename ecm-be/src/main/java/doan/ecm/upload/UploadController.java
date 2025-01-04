package doan.ecm.upload;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/uploads")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    // private final String UPLOAD_DIR = System.getProperty("user.dir") + "/java_ecm_api/uploads/images/";

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = uploadService.uploadFile(file);
            return ResponseEntity.ok().body(new UploadResponse("success", 0, "Upload successful", fileUrl));
        } catch (Exception e) {
            System.out.printf("============== [ERROR] LOI UPLOAD ========== ", e.getMessage());
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UploadResponse("error", 1, "Upload failed image", null));
        }
    }

    @PostMapping("/images")
    public ResponseEntity<?> uploadsImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = uploadService.uploadFile(file);
            return ResponseEntity.ok().body(new UploadResponse("success", 0, "Upload successful", fileUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UploadResponse("error", 1, "Upload failed", e.getMessage()));
        }
    }
}
