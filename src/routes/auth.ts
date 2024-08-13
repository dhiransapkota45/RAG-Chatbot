import { Router } from "express";
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

export default router;
