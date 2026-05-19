import express from "express"
 import { verifyToken } from "../middleware/verifyToken.js"
import postController from "../controllers/post.controller.js"

const router = express.Router()

router.get("/", postController.getPosts)
router.get("/:id", postController.getPost)  // Remove verifyToken — getPost already handles optional token internally
router.post("/", verifyToken, postController.addPost)
router.put("/:id", verifyToken, postController.updatePost)
router.delete("/:id", verifyToken, postController.deletePost)

export default router