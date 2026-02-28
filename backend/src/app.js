const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.get("/api/health", async (req, res) => {
    let dbConnected = false;
    try {
        const client = await pool.connect();
        dbConnected = true;
        client.release();
    } catch (err) {
        console.error("Health check DB error:", err.message);
    }
    
    res.status(dbConnected ? 200 : 503).json({
        uptime: process.uptime(),
        status: dbConnected ? "OK" : "ERROR",
        timestamp: new Date().toISOString(),
        dbConnected
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to MiniBlog API" });
});

// Export app
module.exports = app;
