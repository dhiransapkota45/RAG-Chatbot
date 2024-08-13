import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { Router } from "express";
import { config } from "../config/config";
const router = Router();

router.post("/google/callback", (req, res) => {
  const query = req.query;

  res.cookie("access_token", req.query.access_token, {
    maxAge: Number(query?.expires_in) * 1000,
  });
  res.cookie("refresh_token", req.query.refresh_token, {
    httpOnly: true,
  });
  return res.status(200).json({ message: "success" });
});

router.get("/callback", async function (req, res) {
  console.log("reached here");
  const code = req.query.code as string;
  const next = (req.query.next ?? "/") as string;
  console.log("code", code);
  if (code) {
    const supabase = createServerClient(
      config.SUPABASE_URL,
      config.SUPABASE_KEY,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(req.headers.cookie ?? "");
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              res.appendHeader(
                "Set-Cookie",
                serializeCookieHeader(name, value, options)
              )
            );
          },
        },
      }
    );
    await supabase.auth.exchangeCodeForSession(code);
  }

  console.log("then here");

  res.redirect(303, `/${next?.slice(1)}`);
});

export default router;
