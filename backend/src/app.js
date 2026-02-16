const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to MiniBlog API" });
});

// Export app
module.exports = app;
