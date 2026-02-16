# Sử dụng Node.js bản nhẹ (Alpine Linux)
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package để cài dependency trước (tối ưu cache)
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ code nguồn vào container
COPY . .

# Mở port 5000
EXPOSE 5000

# Lệnh chạy server
CMD ["node", "server.js"]
