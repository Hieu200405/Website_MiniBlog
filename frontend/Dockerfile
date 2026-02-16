FROM node:18-alpine

WORKDIR /app

# Copy package.json và cài dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code
COPY . .

# Mở port 5173 (port mặc định của Vite)
EXPOSE 5173

# Chạy app ở chế độ development
CMD ["npm", "run", "dev", "--", "--host"]
