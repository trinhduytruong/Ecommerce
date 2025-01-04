# Mục lục
## Tài liệu
- [File note](https://docs.google.com/spreadsheets/d/1Wxg-4o8K7XSKD0dje0ax6YKIau8PFPqjANGmuVh3S0Y/edit?gid=0#gid=0)
## Vận hành
* Project ADMIN => Chứa toàn bộ source của ADMIN 
* Project java-ecm-api => Chưa toàn bộ API
* Project Client => Chứa toàn bộ source của user và người dùng 
### Cài đặt project
* Đối với project java-ecm-api bạn có thể dùng IntelliJ IDEA hoạc Visual Studio Code
* Đối với project client và admin bạn có thể dùng  Visual Studio Code hoạc Webstorm
![Import toàn bộ source vào Visual Studio Code như ảnh](<Screenshot 2024-11-29 at 11.09.37 AM.png>)
### Làm sao login vào admin
    1. Run project client
    2. Tạo 1 tài khoản => tài khoản này mặc định là user_type=USER
    3. Sau khi tạo xong thì vào DB sửa user_type từ USER thành ADMIN
    4. Run project admin hệ thống sẽ điều hướng sang màn login và login tài khoản vừa tạo ( tạm thời chưa chặn user_type mới vào ADMIN nên có thể bỏ bước 3



