terraform {
  required_providers {
    render = {
      source  = "render-oss/render"
      version = "~> 1.0"
    }
  }
}

variable "render_api_key" {
  type        = string
  description = "Mã API Key lấy từ tài khoản Render.com"
  sensitive   = true
}

variable "github_repo" {
  type        = string
  description = "URL của Github Repository chứa code của bạn"
  default     = "https://github.com/hieu200405/Website_MiniBlog"
}

provider "render" {
  api_key = var.render_api_key
}

# 1. Khởi tạo Database PostgreSQL
resource "render_postgres" "blog_db" {
  name       = "miniblog-db-tf"
  plan       = "free"
  region     = "singapore"
  version    = "15"
}

# 2. Khởi tạo Backend Web Service
resource "render_web_service" "backend_api" {
  name               = "miniblog-backend-tf"
  plan               = "free"
  region             = "singapore"
  env                = "docker"
  repo_url           = var.github_repo
  branch             = "main"
  docker_context     = "./backend"
  docker_file_path   = "./backend/Dockerfile"
  
  env_vars = {
    "PORT"         = "5000"
    # Lấy thông tin kết nối DB trực tiếp từ resource database vừa tạo ở trên
    "DB_HOST"      = render_postgres.blog_db.internal_connection_string
    "NODE_ENV"     = "production"
    "JWT_SECRET"   = "SieuBaoMat123!!!"
  }
}

# 3. Khởi tạo Frontend Web Service
resource "render_web_service" "frontend_app" {
  name               = "miniblog-frontend-tf"
  plan               = "free"
  region             = "singapore"
  env                = "docker"
  repo_url           = var.github_repo
  branch             = "main"
  docker_context     = "./frontend"
  docker_file_path   = "./frontend/Dockerfile.prod"

  env_vars = {
    # Truyền tự động đường dẫn backend API vừa được tạo ra
    "VITE_API_URL"   = render_web_service.backend_api.url
  }
}

# --- Kết quả trả về sau khi chạy thành công ---
output "backend_live_url" {
  value = render_web_service.backend_api.url
  description = "URL Backend API"
}

output "frontend_live_url" {
  value = render_web_service.frontend_app.url
  description = "URL Giao diện Frontend"
}
