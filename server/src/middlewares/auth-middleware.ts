import { Request, Response, NextFunction } from "express";
import { tokenService } from "../services/TokenService";
import ApiError from "../types/ApiError";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { Token } = req.cookies;
  if (!Token) {
    return next(ApiError.UnauthorizedError());
  }

  const userData = tokenService.validateToken(Token);
  if (userData) {
    next();
  } else {
    return next(ApiError.TokenExpired());
  }
};
export default authMiddleware;
