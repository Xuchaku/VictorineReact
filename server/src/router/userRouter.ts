import { Router } from "express";
import { userController } from "../controllers/userController";
import authMiddleware from "../middlewares/auth-middleware";
const userRouter = Router();
userRouter.post("/login", userController.login);
userRouter.post("/logout", authMiddleware, userController.logout);
userRouter.post("/registration", userController.registration);
export default userRouter;
