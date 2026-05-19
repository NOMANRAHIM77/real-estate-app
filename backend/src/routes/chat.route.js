import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import chatController from "../controllers/chat.controller.js"

const router = express.Router()

router.get("/",verifyToken, chatController.getChats)
router.get("/:id", verifyToken, chatController.getChat)
router.post("/", verifyToken, chatController.addChat)
router.post("/read/:id", verifyToken, chatController.readChat)

export default router