import express from "express";
import userRouter from "./router/userRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error-middleware";
import { WebSocketServer } from "./services/WebSoketService";
import dotenv from "dotenv";
const app = express();
dotenv.config();

const ws = new WebSocketServer(Number(process.env.WEBSOCKET_PORT));
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(express.static(__dirname + "/public"));
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use(errorMiddleware);

app.listen(Number(process.env.EXPRESS_PORT), () => {
  console.log("Start develop server");
});
