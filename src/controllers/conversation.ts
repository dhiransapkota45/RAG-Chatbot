import { Response } from "express";
import { Relations } from "../data/constants";
import { supabase } from "../config/supabase";
import { TAuthenticatedRequest } from "../types/types";
import { postConversation as postConversationService } from "../services/conversation";
import { config } from "../config/config";

export const getAllConversation = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const response = await supabase
    .from(Relations.CONVERSATION)
    .select("*")
    .eq("user", req?.user?.id);
  res.send(response.data);
};

export const postConversation = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const { body } = req;
  const conversation = await postConversationService({
    user: req?.user?.id,
    ...body,
  });
  return res
    .status(200)
    .json({ message: "conversation created successfully", conversation });
};

export const deleteConversation = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  await supabase.from(Relations.CONVERSATION).delete().eq("id", id);
  return res.status(200).json({ message: "Conversation deleted successfully" });
};
