# **EpiMap-BE**

EpiMap là ứng dụng web quản lý và trực quan hóa dữ liệu dịch tễ học, hỗ trợ theo dõi, phân tích và truy vết ca bệnh theo thời gian thực. Về phía FrontEnd ứng dụng được xây dựng với React 19, Vite 4, sử dụng các thư viện UI hiện đại và hỗ trợ quản lý trạng thái, routing, cũng như tích hợp API linh hoạt. Về phía BackEnd, được xây dựng bằng Nodejs

## Backend cho website đồ án EpiMap - Thông tin Địa lý 3 chiều IE402.P21

### Cấu hình file .env
```
DB_URI=mongodb+srv://<username>:<password>@quanlydichbenh.3rdgyln.mongodb.net/?retryWrites=true&w=majority&appName=QuanLyDichBenh
PORT=5000
JWT_SECRET=<key>
```
Thay \<username\> & \<password\> theo user đã tạo trên MongoDB Atlas

### Cài đặt

```bash
git clone https://github.com/git-mk39/EpiMap-BE.git
cd EpiMap-BE
npm install
```

### Chạy ứng dụng
```
npm run dev
```




