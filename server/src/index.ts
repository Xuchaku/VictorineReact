import express from "express";
import userRouter from "./router/userRouter";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use("/user", userRouter);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(8000, () => {
  console.log("Start develop server");
});
