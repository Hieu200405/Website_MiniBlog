const express = require("express");
const cors = require("cors");
const os = require("os");
const client = require("prom-client");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const pool = require("./config/db");
const logger = require("./utils/logger");

const app = express();

// Prometheus Metrics Setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'miniblog_' });
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 500]
});

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
        httpRequestDurationMicroseconds
          .labels(req.method, req.route ? req.route.path : req.url, res.statusCode)
          .observe(duration);
    });
    next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Enhanced Health endpoint
app.get("/api/health", async (req, res) => {
    let dbConnected = false;
    let dbError = null;
    try {
        const clientDb = await pool.connect();
        dbConnected = true;
        clientDb.release();
    } catch (err) {
        dbError = err.message;
        logger.error(`Health check DB error: ${err.message}`);
    }
    
    const healthData = {
        status: dbConnected ? "OK" : "DEGRADED",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        system: {
            platform: process.platform,
            cpuCount: os.cpus().length,
            freeMemory: os.freemem(),
            totalMemory: os.totalmem(),
            loadAverage: os.loadavg()
        },
        database: {
            connected: dbConnected,
            error: dbError
        }
    };
    
    res.status(dbConnected ? 200 : 503).json(healthData);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to MiniBlog API" });
});

// Export app
module.exports = app;
