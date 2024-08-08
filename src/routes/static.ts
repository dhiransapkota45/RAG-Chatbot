import { Router } from "express";
import path from "path";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

router.get("/redirect", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/redirect.html"));
});

export default router;
