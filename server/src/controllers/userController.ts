import { Request, Response, NextFunction } from "express";
class UserController {
  constructor() {}
  registration() {}
  login(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;
    console.log(login, password);
  }
}
export const userController: UserController = new UserController();
