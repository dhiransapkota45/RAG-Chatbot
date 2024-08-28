import { Request, Response, Router } from "express";
import authMiddleware from "../middleware/authmiddleware";
import {
  deleteConversation,
  getAllConversation,
  postConversation,
} from "../controllers/conversation";
import asyncUtil from "../middleware/globalError";

const router = Router();

router.get("/", authMiddleware, asyncUtil(getAllConversation));

router.post("/", authMiddleware, asyncUtil(postConversation));

router.post(
  "/:id",
  asyncUtil((req: Request, res: Response) => {
    res.send("to be implemented");
  })
);

router.delete("/:id", authMiddleware, asyncUtil(deleteConversation));

export default router;
