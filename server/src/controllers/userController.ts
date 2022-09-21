import { Request, Response, NextFunction } from "express";
import { tokenService } from "../services/TokenService";
import crypto from "crypto";
import fs from "fs";
import User from "../types/User";
class UserController {
  constructor() {}
  info(req: Request, res: Response, next: NextFunction) {
    try {
      const { Token } = req.cookies;
      const userData = tokenService.validateToken(Token) as User;

      const { users } = JSON.parse(
        fs.readFileSync(__dirname + "/../fakeDataBase/users.json", "utf8")
      );
      const findUser: User = users.find((user: User) => {
        return user.login == userData.login;
      });
      if (findUser) {
        const { login, link, dataRegistrate, imgUrl, about } = findUser;
        console.log(login, link, dataRegistrate, imgUrl, about);
        res.status(200).send({
          ok: 200,
          user: { login, link, dataRegistrate, imgUrl, about },
        });
      } else {
        throw new Error("Упс! Вашего аккаунта нет!");
      }
    } catch (err) {
      next(err);
    }
  }
  online(req: Request, res: Response, next: NextFunction) {
    try {
      const { users } = JSON.parse(
        fs.readFileSync(__dirname + "/../fakeDataBase/users.json", "utf8")
      );
      const { Token } = req.cookies;
      const userData = tokenService.validateToken(Token);
      if (userData) {
        res.status(200).send({
          ok: 200,
          text: `Вы успешно зали под логином`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  registration(req: Request, res: Response, next: NextFunction) {
    try {
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
        res
          .status(200)
          .send({ ok: true, text: "Вы успешно зарегистрировались" });
      }
    } catch (err) {
      next(err);
    }
  }
  logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { Token } = req.cookies;
      if (Token) {
        res.clearCookie("Token");
        res.status(200).send({ ok: true, text: "Вы успешно вышли" });
      }
    } catch (err) {
      next(err);
    }
  }
  login(req: Request, res: Response, next: NextFunction) {
    try {
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
          res.cookie("Token", token, {
            maxAge: 8 * 3600000,
            httpOnly: true,
          });
          res.status(200).send({ ok: true, text: "Добро пожаловать" });
        } else {
          res.status(400).send({
            ok: false,
            text: "Неверно введен пароль",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
}
export const userController: UserController = new UserController();
