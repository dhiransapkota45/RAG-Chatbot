import { Response } from "express";
import { TAuthenticatedRequest } from "../types/types";
import { Relations } from "../data/constants";
import { supabase } from "../config/supabase";

export const getAllMessages = async (
  req: TAuthenticatedRequest,
  res: Response
) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const response = await supabase
    .from(Relations.MESSAGE)
    .select("*")
    .eq("user", req?.user?.id)
    .range((page - 1) * limit, page * limit - 1);

  return res
    .status(200)
    .json({ data: response.data, message: "Messages retrieved successfully" });
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
