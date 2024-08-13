import { NextFunction, Request, Response } from "express";
import { supabase } from "../config/supabase";
import { User } from "@supabase/supabase-js";
import { TAuthenticatedRequest } from "../types/types";

// Middleware function
const authMiddleware = async (
  req: TAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.split("Bearer ")[1];

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
