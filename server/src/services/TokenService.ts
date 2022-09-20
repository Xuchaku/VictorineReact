import jsonwebtoken from "jsonwebtoken";
import User from "../types/User";
class TokenService {
  constructor() {}
  generateToken(payload: User) {
    const token = jsonwebtoken.sign(payload, "Shefk734Bkfsl", {
      expiresIn: "1h",
    });
    return token;
  }
}
export const tokenService: TokenService = new TokenService();
