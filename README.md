# Website MiniBlog (Fullstack + CI/CD + Docker)

Dự án Blog cá nhân hoàn chỉnh bao gồm **Backend (Node.js/Express)**, **Frontend (React/Vite)** và **Database (PostgreSQL)**. Dự án được tự động hóa bằng **Docker** và tích hợp **CI (GitHub Actions)**.

## 🌟 Tính năng nổi bật

- **Fullstack**: Kiến trúc tách biệt Backend/Frontend.
- **Authentication**: Đăng ký, Đăng nhập, JWT, Bảo mật mật khẩu.
- **Dockerized**: Chạy toàn bộ hệ thống chỉ với 1 lệnh `docker-compose`.
- **CI/CD**: Tự động test và build Docker image khi push code lên GitHub.
- **Database**: PostgreSQL với script khởi tạo tự động.

## 🛠 Công nghệ sử dụng

- **Frontend**: React.js, Vite, Axios, React Router DOM.
- **Backend**: Node.js, Express.js, JWT, Bcrypt.
- **Database**: PostgreSQL (With automatic migration).
- **Testing**: Jest, Supertest.
- **DevOps (Basic)**: Docker, Docker Compose, GitHub Actions.
- **DevSecOps (Advanced)**: Trivy Scanner, CodeQL SAST.
- **Infrastructure as Code**: Terraform, NGINX API Gateway, Render Blueprints.

## 📂 Cấu trúc dự án

```
Website_MiniBlog/
├── backend/            # Mã nguồn Backend
│   ├── tests/          # Unit & Integration Tests
│   ├── Dockerfile
│   └── ...
├── frontend/           # Mã nguồn Frontend
│   ├── Dockerfile
│   └── ...
├── .github/workflows/  # Cấu hình CI (Frontend + Backend)
├── docker-compose.yml  # File điều phối Docker toàn cục
├── .gitignore
└── README.md
```

## //

## 🚀 Chạy dự án (Khuyên dùng Docker)

### Yêu cầu

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) đã cài đặt.

### Các bước

1.  Clone dự án về máy.
2.  Tại thư mục gốc, chạy lệnh:
    ```bash
    docker-compose up --build
    ```
3.  Truy cập:
    - **Frontend**: [http://localhost:5173](http://localhost:5173)
    - **Backend API**: [http://localhost:5000](http://localhost:5000) (User `postgres` / Pass `root`)
    - **Database**: Port `5433` (để tránh trùng với local DB).

---

## ⚙️ CI/CD (GitHub Actions)

Dự án đã tích hợp sẵn 2 workflows tự động:

1.  **Backend CI**:
    - Tự động chạy khi có thay đổi trong thư mục `backend/`.
    - Cài đặt môi trường -> Chạy Test (`npm test`) với Database ảo -> Build Docker Image.
2.  **Frontend CI**:
    - Tự động chạy khi có thay đổi trong thư mục `frontend/`.
    - Cài đặt môi trường -> Build Project (`npm run build`) -> Build Docker Image.

Để kích hoạt, bạn chỉ cần push code lên GitHub:

```bash
git push origin main
```

---

## 📡 API Endpoints

| Method     | Endpoint         | Mô tả             | Auth |
| :--------- | :--------------- | :---------------- | :--- |
| **POST**   | `/auth/register` | Đăng ký           | ❌   |
| **POST**   | `/auth/login`    | Đăng nhập         | ❌   |
| **GET**    | `/posts`         | Xem danh sách bài | ❌   |
| **POST**   | `/posts`         | Đăng bài          | ✅   |
| **PUT**    | `/posts/:id`     | Sửa bài           | ✅   |
| **DELETE** | `/posts/:id`     | Xóa bài           | ✅   |

## 🧪 Testing

Để chạy test backend thủ công (không qua Docker):

```bash
cd backend
npm test
```

## 🤝 Đóng góp

Dự án phục vụ mục đích học tập. Pull Request được chào đón!
