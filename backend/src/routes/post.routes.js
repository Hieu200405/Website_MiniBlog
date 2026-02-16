const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Public
router.get("/", postController.getAllPosts);

// Protected
router.post("/", verifyToken, postController.createPost);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;
