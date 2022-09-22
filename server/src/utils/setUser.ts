import User from "../types/User";
import fs from "fs";
import crypto from "crypto";
import base64ImgSave from "./saveBase64";

export const changeUser = (
  user: User,
  fields: { login: string; link: string; about: string; data: string }
) => {
  try {
    const userModify: User = {
      ...user,
      login: fields.login || user.login,
      link: fields.link || user.link,
      about: fields.about || user.about,
    };
    if (fields.data) {
      const nameImg = crypto
        .createHmac("sha256", "TEST")
        .update(new Date().toString() + userModify.login)
        .digest("hex");
      base64ImgSave(fields.data, nameImg);
      userModify.imgUrl = `http://localhost:8000/avatars/${nameImg}.jpg`;
      return userModify;
    }
    return userModify;
  } catch (err) {}
};
