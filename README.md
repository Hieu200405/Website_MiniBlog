# Website MiniBlog

Dự án Blog cá nhân full-stack bao gồm **Backend (Node.js/Express)** và **Frontend (React/Vite)**.

## 📂 Cấu trúc dự án

```
Website_MiniBlog/
├── backend/          # Server Node.js, API, Database
├── frontend/         # Giao diện ReactJS
├── .gitignore        # Cấu hình git ignore toàn cục
└── README.md         # Tài liệu dự án
```

---

## 🛠 Backend (Node.js + PostgreSQL)

### Cài đặt & Chạy

1.  Vào thư mục backend: `cd backend`
2.  Cài đặt thư viện: `npm install`
3.  Cấu hình môi trường:
    - Copy `.env.example` thành `.env`
    - Cập nhật thông tin DB (Host, User, Pass...)
4.  Chạy server: `npm run dev`
    - Server sẽ chạy tại: `http://localhost:5000`

### Docker (Tùy chọn)

Bạn có thể chạy toàn bộ Backend + Database bằng Docker:

```bash
cd backend
docker-compose up --build
```

---

## 🎨 Frontend (React + Vite)

### Cài đặt & Chạy

1.  Vào thư mục frontend: `cd frontend`
2.  Cài đặt thư viện: `npm install`
3.  Cấu hình môi trường:
    - Tạo file `.env` với nội dung: `VITE_API_URL=http://localhost:5000`
4.  Chạy ứng dụng: `npm run dev`
    - Web sẽ mở tại: `http://localhost:5173`

---

## 🔑 Tài khoản Test (Mặc định)

Nếu bạn chạy Docker hoặc Database mới, hãy đăng ký tài khoản mới qua API hoặc giao diện.

## 🤝 Đóng góp

Pull requests are welcome!
