import { Router } from "express";
import authMiddleware from "../middleware/authmiddleware";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  updateMessage,
} from "../controllers/message";
import asyncUtil from "../middleware/globalError";

const router = Router();

router.get("/", authMiddleware, asyncUtil(getAllMessages));
router.post("/", authMiddleware, asyncUtil(createMessage));
router.delete("/:id", authMiddleware, asyncUtil(deleteMessage));
router.put("/:id", authMiddleware, asyncUtil(updateMessage));

export default router;
