import { Request, Response, NextFunction } from "express";
import { tokenService } from "../services/TokenService";
import crypto from "crypto";
import fs from "fs";
import User from "../types/User";
class UserController {
  constructor() {}
  registration(req: Request, res: Response, next: NextFunction) {
    const { login, password, verifyPassword, dataRegistrate } = req.body;
    const { users } = JSON.parse(
      fs.readFileSync(__dirname + "/../fakeDataBase/users.json", "utf8")
    );
    const findUser: User | undefined = users.find((user: User) => {
      return user.login == login;
    });
    if (findUser) {
      res.status(400).send({
        ok: false,
        text: "Пользователь с таким именем уже существует",
      });
    } else {
      const hashPassword = crypto
        .createHmac("sha256", "SECRETS123")
        .update(password)
        .digest("hex");
      const newUser: User = {
        login,
        hashPassword,
        dataRegistrate,
        imgUrl: "",
        link: "",
        about: "",
      };
      users.push(newUser);
      const dataToFile = JSON.stringify({ users });
      const out = fs.writeFileSync(
        __dirname + "/../fakeDataBase/users.json",
        dataToFile
      );
      res.status(200).send({ ok: true, text: "Вы успешно зарегистрировались" });
    }
  }
  logout(req: Request, res: Response, next: NextFunction) {}
  login(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;
    const { users } = JSON.parse(
      fs.readFileSync(__dirname + "/../fakeDataBase/users.json", "utf8")
    );
    const findUser: User | undefined = users.find((user: User) => {
      return user.login == login;
    });
    if (!findUser) {
      res.status(400).send({
        ok: false,
        text: "Пользователя с данным логином не существует",
      });
    } else {
      const verifyPass = crypto
        .createHmac("sha256", "SECRETS123")
        .update(password)
        .digest("hex");
      if (verifyPass == findUser.hashPassword) {
        const token = tokenService.generateToken(findUser);
        res.cookie("Token", token, { maxAge: 3600000, httpOnly: true });
        res.status(200).send({ ok: true, text: "Добро пожаловать" });
      } else {
        res.status(400).send({
          ok: false,
          text: "Неверно введен пароль",
        });
      }
    }
  }
}
export const userController: UserController = new UserController();
