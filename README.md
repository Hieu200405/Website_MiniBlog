# Website MiniBlog (Fullstack)

Dự án Blog cá nhân full-stack bao gồm **Backend (Node.js/Express)**, **Frontend (React/Vite)** và **Database (PostgreSQL)**. Dự án hỗ trợ chạy hoàn toàn bằng **Docker** hoặc chạy thủ công từng phần.

## � Công nghệ sử dụng

- **Frontend**: React.js, Vite, Axios, React Router DOM.
- **Backend**: Node.js, Express.js, JWT Authentication.
- **Database**: PostgreSQL.
- **DevOps**: Docker, Docker Compose.

## �📂 Cấu trúc dự án

```
Website_MiniBlog/
├── backend/            # Mã nguồn Backend (Node.js)
│   ├── src/
│   ├── Dockerfile
│   ├── database.sql    # Script khởi tạo database
│   └── ...
├── frontend/           # Mã nguồn Frontend (React)
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml  # Cấu hình Docker toàn cục (Frontend + Backend + DB)
├── .gitignore
└── README.md
```

---

## 🚀 Cách 1: Chạy bằng Docker (Khuyên dùng)

Cách nhanh nhất để dựng toàn bộ dự án (Frontend + Backend + Database) chỉ với 1 lệnh.

### Yêu cầu

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) đã được cài đặt và đang chạy.

### Các bước thực hiện

1.  Tại thư mục gốc `Website_MiniBlog`, mở terminal.
2.  Chạy lệnh:
    ```bash
    docker-compose up --build
    ```
3.  Chờ vài phút để Docker tải image và khởi động services.
4.  Truy cập:
    - **Frontend (Web)**: [http://localhost:5173](http://localhost:5173)
    - **Backend API**: [http://localhost:5000](http://localhost:5000)
    - **Database**: `localhost:5433` (User: `postgres`, Pass: `root`, DB: `blog_db`)

_Lưu ý: Database sẽ tự động khởi tạo dữ liệu mẫu lần đầu tiên chạy._

---

## 🛠 Cách 2: Chạy Thủ Công (Local Development)

Nếu bạn muốn chạy từng phần để phát triển (không dùng Docker).

### 1. Khởi chạy Database

Bạn cần tự cài đặt PostgreSQL và tạo database tên `postgre` (hoặc cập nhật file `.env` tương ứng).

- Chạy script `backend/database.sql` để tạo bảng `users` và `posts`.

### 2. Khởi chạy Backend

1.  Di chuyển vào thư mục backend: `cd backend`
2.  Cài đặt thư viện: `npm install`
3.  Cấu hình môi trường:
    - Copy file `.env.example` thành `.env`.
    - Cập nhật thông tin kết nối Database của bạn trong file `.env`.
4.  Chạy server:
    ```bash
    npm run dev
    ```
    Server chạy tại: `http://localhost:5000`

### 3. Khởi chạy Frontend

1.  Mở terminal mới, di chuyển vào thư mục frontend: `cd frontend`
2.  Cài đặt thư viện: `npm install`
3.  Cấu hình môi trường (nếu cần):
    - File `.env` mặc định đã trỏ đến `http://localhost:5000`.
4.  Chạy ứng dụng:
    ```bash
    npm run dev
    ```
    Web chạy tại: `http://localhost:5173`

---

## � API Endpoints Chính

| Method     | Endpoint         | Mô tả                  | Yêu cầu Auth          |
| :--------- | :--------------- | :--------------------- | :-------------------- |
| **POST**   | `/auth/register` | Đăng ký tài khoản      | Không                 |
| **POST**   | `/auth/login`    | Đăng nhập (Lấy Token)  | Không                 |
| **GET**    | `/posts`         | Lấy danh sách bài viết | Không                 |
| **POST**   | `/posts`         | Tạo bài viết mới       | **Có** (Bearer Token) |
| **PUT**    | `/posts/:id`     | Cập nhật bài viết      | **Có** (Chính chủ)    |
| **DELETE** | `/posts/:id`     | Xóa bài viết           | **Có** (Chính chủ)    |

## 🧪 Tài khoản Test & Hướng dẫn Postman

- Xem file `POSTMAN_GUIDE.md` (nếu có) hoặc xem hướng dẫn chi tiết API trong thư mục backend.
- Token xác thực cần được gửi trong Header: `Authorization: Bearer <token>`

## 🤝 Đóng góp

Dự án mã nguồn mở phục vụ mục đích học tập. Mọi đóng góp đều được hoan nghênh!
