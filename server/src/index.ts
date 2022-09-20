import express from "express";
import userRouter from "./router/userRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error-middleware";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Start develop server");
  console.log(__dirname);
});
