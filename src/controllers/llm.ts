import { Response } from "express";
import { TAuthenticatedRequest, TConversation } from "../types/types";
import { UUID } from "crypto";
import { getConversation, postConversation } from "../services/conversation";
import { promptParser } from "../llm";
import { postMessage } from "../services/message";

export const conversationWithLlm = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  if (!req.body.prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  //create a conversation if does not exist already
  const conversationId = req?.body?.conversationId;
  let conversation: TConversation | null;
  if (!conversationId) {
    conversation = await postConversation({
      title: req.body.title,
      user: req?.user?.id as UUID,
    });
  } else {
    conversation = await getConversation(conversationId);
  }

  console.log(conversation, "conversation created");

  const stream = await promptParser(req.body.prompt);

  let llmResponse = "";
  for await (const chunk of stream) {
    res.write(`${chunk}`);
    llmResponse += chunk;
  }

  conversation?.id &&
    (await postMessage([
      {
        chat: conversation?.id,
        generator: "user",
        message: req?.body?.prompt,
      },
      {
        chat: conversation?.id,
        generator: "assistant",
        message: llmResponse,
      },
    ]));

  res.json({ conversationid: conversation?.id });
  console.log(llmResponse);
  res.end();
  return;
};
