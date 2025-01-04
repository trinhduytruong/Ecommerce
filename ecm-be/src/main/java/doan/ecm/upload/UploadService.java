package doan.ecm.upload;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class UploadService {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/images";
    @Value("${app.base-url}")
    private String baseUrl;

    public String uploadFile(MultipartFile file) throws IOException {
        try{
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.isEmpty()) {
                throw new IllegalArgumentException("Invalid file name");
            }
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = UUID.randomUUID() + fileExtension;
            String filePath = UPLOAD_DIR + File.separator + fileName;

            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs(); // Tạo thư mục nếu chưa tồn tại
            }
            if (!uploadDir.canWrite()) {
                throw new IOException("Cannot write to upload directory");
            }

            Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

            // Return the URL or path where the file is accessible
            return baseUrl + "/uploads/images/" + fileName;
        }catch(Exception e) {
            System.out.printf("============== LOI UPLOAD uploadFile ========== ", e.getMessage());
            System.out.println(e.getMessage());
            return null;
        }
    }
}
