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

// export type TMessage
