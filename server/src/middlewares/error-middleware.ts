import { Request, Response, NextFunction } from "express";
import ApiError from "../types/ApiError";
export const errorMiddleware = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError)
    return res.status(err.status).send({ ok: false, text: err.message });
  return res
    .status(500)
    .send({ ok: false, text: "Непридвиденная ошибка сервера!" });
};
