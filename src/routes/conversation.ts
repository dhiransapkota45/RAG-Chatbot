import { Router } from "express";
import authMiddleware from "../middleware/authmiddleware";
import {
  deleteConversation,
  getAllConversation,
  postConversation,
} from "../controllers/conversation";

const router = Router();

router.get("/", authMiddleware, getAllConversation);

router.post("/", authMiddleware, postConversation);

router.post("/:id", (req, res) => {
  res.send("to be implemented");
});

router.delete("/:id", authMiddleware, deleteConversation);

export default router;
