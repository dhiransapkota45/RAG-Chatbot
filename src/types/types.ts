import { User } from "@supabase/supabase-js";
import { UUID } from "crypto";
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
  chat: UUID;
};

export type TMessage = {
  created_at: Date;
  id: UUID;
} & TMessagePayload;

export type TConversationPayload = {
  user: UUID;
  title: string;
};

export type TConversation = {
  id: UUID;
  created_at: Date;
} & TConversationPayload;
