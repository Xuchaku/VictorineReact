import jsonwebtoken from "jsonwebtoken";
import User from "../types/User";
class TokenService {
  constructor() {}
  generateToken(payload: User) {
    const token = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET || "", {
      expiresIn: "1h",
    });
    return token;
  }
  validateToken(token: string) {
    try {
      const userData = jsonwebtoken.verify(
        token,
        process.env.TOKEN_SECRET || ""
      );
      return userData;
    } catch (e) {
      return null;
    }
  }
}
export const tokenService: TokenService = new TokenService();
