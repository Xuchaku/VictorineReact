import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { tokenService } from "../services/TokenService";
import ApiError from "../types/ApiError";
import User from "../types/User";
const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { Token } = req.cookies;
  if (!Token) {
    return next(ApiError.UnauthorizedError());
  }

  const userData = tokenService.validateToken(Token);
  if (userData) {
    req.userData = userData as User;
    next();
  } else {
    return next(ApiError.TokenExpired());
  }
};
export default authMiddleware;
