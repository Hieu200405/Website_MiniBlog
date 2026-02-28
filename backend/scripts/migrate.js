const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'blog_db',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

async function runMigration() {
  console.log('🔄 Bắt đầu chạy Migration dữ liệu...');
  try {
    const client = await pool.connect();
    // Đọc file database.sql
    const sqlPath = path.join(__dirname, '..', 'database.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');

    console.log('⏳ Đang thực thi các câu lệnh SQL...');
    await client.query(sqlScript);

    console.log('✅ Migration thành công!');
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi trong quá trình Migration:', error);
    process.exit(1);
  }
}

runMigration();
