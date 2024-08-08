import express from "express";
import path from "path";
import { config } from "./config";
import { promptParser } from ".";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const app = express();
const port = config.PORT;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/api/prompt", async (req, res) => {
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

app.get("/getgemini", async (req, res) => {
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

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
