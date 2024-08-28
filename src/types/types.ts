import { User } from "@supabase/supabase-js";
import { Request } from "express";

export type queryType = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  provider_token: string;
  token_type: string;
};

export type TAuthenticatedRequest = Request & { user?: User };

export type TMessagePayload = {
  generator: "user" | "assistant";
  message: string;
  chat: Number;
};

export type TMessage = {
  created_at: Date;
  id: Number;
} & TMessagePayload;

export type TConversationPayload = {
  user: Number;
  title: string;
};

export type TConversation = {
  id: Number;
  created_at: Date;
} & TConversationPayload;

export type THistory = {
  generator: string;
  message: string;
};
