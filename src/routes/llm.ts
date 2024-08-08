import { Router } from "express";
import { promptParser } from "../llm";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/config";
const router = Router();

router.post("/prompt", async (req, res) => {
  if (!req.body.prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  const stream = await promptParser(req.body.prompt);

  for await (const chunk of stream) {
    res.write(`${chunk}`);
  }
  res.end();
  return;
});

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
