import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { config } from "./config/config";
import StaticRoutes from "./routes/static";
import AuthRoutes from "./routes/auth";
import LlmRoutes from "./routes/llm";
import ConversationRoutes from "./routes/conversation";
import MessageRoutes from "./routes/message";
import cors from "cors";

const app = express();
const port = config.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// app.use(express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../views")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
});

app.use("/", StaticRoutes);
app.use("/auth", AuthRoutes);
app.use("/api", LlmRoutes);
app.use("/conversation", ConversationRoutes);
app.use("/message", MessageRoutes);

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
