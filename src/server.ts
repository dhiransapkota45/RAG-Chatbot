import express from "express";
import path from "path";
import { config } from "./config/config";
import StaticRoutes from "./routes/static";
import AuthRoutes from "./routes/auth";
import LlmRoutes from "./routes/llm";
import ConversationRoutes from "./routes/conversation";
import MessageRoutes from "./routes/message";

const app = express();
const port = config.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../views")));

app.use("/", StaticRoutes);
app.use("/auth", AuthRoutes);
app.use("/api", LlmRoutes);
app.use("/conversation", ConversationRoutes);
app.use("/message", MessageRoutes);

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
