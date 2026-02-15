# Website MiniBlog - Backend

Đây là phần Backend cho dự án **Website MiniBlog**, được xây dựng bằng **Node.js** và **Express**, sử dụng **PostgreSQL** làm cơ sở dữ liệu.

## 🛠 Công nghệ sử dụng

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (`pg`)
- **Authentication**: JSON Web Token (JWT) & bcrypt (đang phát triển)
- **Environment**: Dotenv
- **CORS**: Cross-Origin Resource Sharing

## 📂 Cấu trúc dự án

```
Website_MiniBlog/
├── backend/
│   ├── src/
│   │   ├── config/         # Cấu hình Database, Environment...
│   │   ├── controllers/    # Xử lý logic nghiệp vụ (Auth, Post...)
│   │   ├── middleware/     # Các middleware (Auth check, Error handling...)
│   │   ├── routes/         # Định nghĩa các API endpoints
│   │   └── app.js          # Khởi tạo ứng dụng Express
│   ├── .env                # Biến môi trường (không push lên git)
│   ├── server.js           # Điểm khởi chạy server
│   ├── package.json        # Dependencies & Scripts
│   └── ...
├── .gitignore              # Danh sách file bị loại bỏ khỏi git
└── README.md               # Tài liệu dự án
```

## 🚀 Cài đặt và Chạy dự án

### 1. Yêu cầu tiên quyết

- [Node.js](https://nodejs.org/) (phiên bản LTS được khuyến nghị)
- [PostgreSQL](https://www.postgresql.org/) đã được cài đặt và đang chạy.

### 2. Cài đặt Dependencies

Di chuyển vào thư mục `backend` và cài đặt các thư viện:

```bash
cd backend
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` trong thư mục `backend` và điền các thông tin sau (sử dụng thông tin database của bạn):

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=miniblog_db
DB_PORT=5432
JWT_SECRET=your_secret_key
```

### 4. Chạy Server

Để khởi động server (môi trường development):

```bash
# Sử dụng nodemon (nếu đã cài global hoặc trong devDependencies)
npx nodemon server.js

# Hoặc chạy bằng node thường
node server.js
```

Server sẽ chạy tại: `http://localhost:3000` (hoặc port bạn đã cấu hình).

## 📡 API Endpoints (Dự kiến)

Dự án hiện đang có các routes cơ bản:

- **Auth**: `/api/auth` (Đăng ký, Đăng nhập...)
- **Posts**: `/api/posts` (CRUD bài viết...)

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo Pull Request hoặc mở Issue nếu phát hiện lỗi.

## 📄 License

ISC
