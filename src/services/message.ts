import { supabase } from "../config/supabase";
import { Relations } from "../data/constants";
import { THistory, TMessage, TMessagePayload } from "../types/types";

export const postMessage: (
  data: TMessagePayload[]
) => Promise<TMessage[] | null> = async (payload) => {
  const { data, error } = await supabase
    .from(Relations.MESSAGE)
    .insert(payload)
    .select("*");

  if (error) {
    console.log(error);
    throw new Error(`${error.code} | ${error.message}`);
  }

  return data;
};

export const getMessagesHistory = async (
  conversation: number
): Promise<THistory[] | null> => {
  const { data, error } = await supabase
    .from(Relations.MESSAGE)
    .select("generator, message")
    .eq("chat", conversation);

  if (error) {
    console.log(error);
    throw new Error(`${error.code} | ${error.message}`);
  }

  return data;
};

export const getAllMessagesService = async (
  chatid: number,
  limit: number,
  page: number
): Promise<TMessage[] | null> => {
  const limitData = Number(limit) || 10;
  const pagesData = Number(page) || 1;

  const { data, error } = await supabase
    .from(Relations.MESSAGE)
    .select("*")
    .eq("chat", chatid)
    .order("created_at", { ascending: false })
    .range((pagesData - 1) * limitData, pagesData * limitData - 1);

  if (error) {
    throw new Error(`${error.code} | ${error.message}`);
  }
  return data;
};
