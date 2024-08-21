import { Router } from "express";
import authMiddleware from "../middleware/authmiddleware";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  updateMessage,
} from "../controllers/message";

const router = Router();

router.get("/", authMiddleware, getAllMessages);
router.post("/", authMiddleware, createMessage);
router.delete("/:id", authMiddleware, deleteMessage);
router.put("/:id", authMiddleware, updateMessage);

export default router;
