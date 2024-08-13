import { Request, Response } from "express";
import { Relations } from "../data/constants";
import { supabase } from "../config/supabase";
import { TAuthenticatedRequest } from "../types/types";

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
  const { error, data } = await supabase
    .from(Relations.CONVERSATION)
    .insert({ user: req?.user?.id, ...body });
  if (error) {
    throw new Error(`${error.code} | ${error.message}`);
  }
  res.status(200).json({
    message: "Conversation created successfully",
  });
};

export const deleteConversation = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  await supabase.from(Relations.CONVERSATION).delete().eq("id", id);
  return res.status(200).json({ message: "Conversation deleted successfully" });
};
