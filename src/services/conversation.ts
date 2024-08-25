import { UUID } from "crypto";
import { supabase } from "../config/supabase";
import { Relations } from "../data/constants";
import { TConversation, TConversationPayload } from "../types/types";

export const postConversation: (
  conversationData: TConversationPayload
) => Promise<TConversation> = async (conversationData) => {
  const { error, data } = await supabase
    .from(Relations.CONVERSATION)
    .insert(conversationData)
    .select("*")
    .single();

  if (error) {
    throw new Error(`${error.code} | ${error.message}`);
  }
  return data;
};

export const getConversation = async (id: Number, userid: UUID) => {
  const { data, error } = await supabase
    .from(Relations.CONVERSATION)
    .select("*")
    .eq("id", id)
    .eq("user", userid)
    .single();
  if (error) {
    throw new Error(`${error.code} | ${error.message}`);
  }
  return data;
};
