import express from "express";
import userRouter from "./router/userRouter";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

app.listen(8000, () => {
  console.log("Start develop server");
  console.log(__dirname);
});
