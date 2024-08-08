import { Router } from "express";
import path from "path";
import { config } from "../config/config";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    SUPABASE_URL: config.SUPABASE_URL,
    SUPABASE_KEY: config.SUPABASE_KEY,
  });
});

router.get("/redirect", (req, res) => {
  res.render("redirect");
});

export default router;
