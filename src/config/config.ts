import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const config = {
  SUPABASE_URL: process.env.SUPABASE_PROJECT_URL ?? "",
  SUPABASE_KEY: process.env.SUPABASE_API_KEY ?? "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "",
  PORT: process.env.PORT ?? "3000",
  BASEURL: process.env.BASEURL ?? "http://localhost:3000/",
};
