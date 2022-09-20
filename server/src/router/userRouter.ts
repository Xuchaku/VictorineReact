import { Router } from "express";
import { userController } from "../controllers/userController";
const userRouter = Router();
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.post("/registration", userController.registration);
export default userRouter;
