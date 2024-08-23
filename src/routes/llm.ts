import { Response, Router } from "express";
import { promptParser } from "../llm";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/config";
import { getConversation, postConversation } from "../services/conversation";
import { TAuthenticatedRequest, TConversation } from "../types/types";
import { UUID } from "crypto";
import { postMessage } from "../services/message";
import authMiddleware from "../middleware/authmiddleware";
import { conversationWithLlm } from "../controllers/llm";
import asyncUtil from "../middleware/globalError";
const router = Router();

router.post("/prompt", authMiddleware, asyncUtil(conversationWithLlm));

router.get("/getgemini", async (req, res) => {
  try {
    const gemini = new ChatGoogleGenerativeAI({
      apiKey: config.GEMINI_API_KEY,
    });
    const aiMsg = await gemini.invoke([
      [
        "system",
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
      ],
      ["human", "I love programming."],
    ]);
    aiMsg;
    return res.json({ data: aiMsg.content });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message ?? "" });
  }
});
export default router;
