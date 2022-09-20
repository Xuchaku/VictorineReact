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
  validateToken(token: string) {
    try {
      const userData = jsonwebtoken.verify(token, "Shefk734Bkfsl");
      console.log(userData);
      return userData;
    } catch (e) {
      return null;
    }
  }
}
export const tokenService: TokenService = new TokenService();
