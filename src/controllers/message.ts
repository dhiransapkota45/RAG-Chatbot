import { Response } from "express";
import { TAuthenticatedRequest } from "../types/types";
import { Relations } from "../data/constants";
import { supabase } from "../config/supabase";
import { getAllMessagesService } from "../services/message";
import { getConversation } from "../services/conversation";

export const getAllMessages = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  const conversationid = req.body.chatid ?? "";

  getConversation(conversationid, Number(req?.user?.id));

  const data = await getAllMessagesService(conversationid, limit, page);
  return data;
};

export const createMessage = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const { body } = req;
  const { error, data } = await supabase.from(Relations.MESSAGE).insert(body);
  if (error) {
    throw new Error(`${error.code} | ${error.message}`);
  }
  return res.status(200).json({
    message: "Message created successfully",
  });
};

export const deleteMessage = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  await supabase.from(Relations.MESSAGE).delete().eq("id", id);
  return res.status(200).json({ message: "Message deleted successfully" });
};

export const updateMessage = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  const { body } = req;
  const { error, data } = await supabase
    .from(Relations.MESSAGE)
    .update(body)
    .eq("id", id);
  if (error) {
    throw new Error(`${error.code} | ${error.message}`);
  }
  return res.status(200).json({
    message: "Message updated successfully",
  });
};
