import { supabase } from "../config/supabase";
import { Relations } from "../data/constants";
import { TMessage, TMessagePayload } from "../types/types";

export const postMessage: (
  data: TMessagePayload[]
) => Promise<TMessage[] | null> = async (payload) => {
  const { data, error } = await supabase
    .from(Relations.MESSAGE)
    .insert(payload);

  if (error) {
    throw new Error(`${error.code} | ${error.message}`);
  }

  return data;
};
