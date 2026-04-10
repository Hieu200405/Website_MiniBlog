# Sử dụng Node.js bản nhẹ (Alpine Linux)
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package trước để tối ưu layer cache
COPY package*.json ./

# hadolint ignore=DL3018
RUN apk add --no-cache curl && \
    npm install

# Copy toàn bộ code nguồn
COPY . .

# Mở port 5000
EXPOSE 5000

# Lệnh chạy server
CMD ["node", "server.js"]
