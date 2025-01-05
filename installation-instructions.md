# Hướng dẫn cài đặt và chạy ứng dụng ReactJS + Spring Boot (Đã có mã nguồn)

## **1. Yêu cầu hệ thống**
- **Node.js**: Phiên bản  16.14.0
- **Java**: JDK 17
- **Maven**: Phiên bản 3.2.10
- **IDE**: IntelliJ IDEA, Eclipse hoặc VSCode
- **Cơ sở dữ liệu**: MySQL

---

## **2. Chuẩn bị môi trường**

### **2.1. Clone mã nguồn**
1. Mở file mã nguồn
2. Di chuyển vào thư mục dự án:
   ```bash
   cd <ten_thu_muc_du_an>
   ```

---

## **3. Cài đặt Backend (Spring Boot)**

### **3.1. Cấu hình cơ sở dữ liệu**
1. Tạo cơ sở dữ liệu mới trong MySQL.
2. Mở file cấu hình `application.properties` hoặc `application.yml` trong thư mục `src/main/resources`.
3. Cập nhật thông tin kết nối:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ten_database
   spring.datasource.username=ten_nguoi_dung
   spring.datasource.password=mat_khau

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

### **3.2. Cài đặt và chạy ứng dụng Spring Boot**
1. Chạy lệnh Maven để tải các thư viện cần thiết:
   ```bash
   mvn clean install
   ```
2. Khởi động server bằng lệnh:
   ```bash
   mvn spring-boot:run
   ```
3. Kiểm tra backend hoạt động bằng cách truy cập `http://localhost:8080`.

---

## **4. Cài đặt Frontend (ReactJS)**

### **4.1. Cài đặt dependencies**
1. Di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```

### **4.2. Chạy ứng dụng React**
1. Chạy lệnh:
   ```bash
   npm start
   ```
2. Truy cập `http://localhost:3000` để kiểm tra giao diện.

---

## **5. Tích hợp và chạy toàn bộ ứng dụng**

1. Đảm bảo backend và frontend đang chạy trên các cổng khác nhau (mặc định: Spring Boot - `8080`, React - `3000`).
2. Kiểm tra các API bằng React (thường sử dụng Axios hoặc Fetch).

   Ví dụ: Gọi API từ React để lấy danh sách người dùng:
   ```javascript
   import axios from 'axios';

   axios.get('http://localhost:8080/api/users')
       .then(response => {
           console.log(response.data);
       })
       .catch(error => {
           console.error("Có lỗi xảy ra:", error);
       });
   ```

---

## **6. Đóng gói và triển khai**

### **6.1. Đóng gói Frontend**
1. Tạo build sản phẩm bằng lệnh:
   ```bash
   npm run build
   ```
2. Copy thư mục `build` sang thư mục `src/main/resources/static` của backend.

### **6.2. Đóng gói và chạy Spring Boot**
1. Tạo file JAR bằng lệnh:
   ```bash
   mvn clean package
   ```
2. Chạy file JAR:
   ```bash
   java -jar target/<ten_file>.jar
   ```

### **6.3. Truy cập ứng dụng**
- Mở trình duyệt và truy cập `http://localhost:8080` để sử dụng ứng dụng.

---

## **7. Ghi chú**
- Đảm bảo các thư viện và phiên bản phụ thuộc tương thích.
- Sử dụng **Postman** để kiểm tra các API từ backend.
- Nếu cần triển khai trên server thực, cân nhắc sử dụng **Docker** hoặc **nginx** để cấu hình.

---
