import { TokenPayload } from "../utils/generateTokens.js";

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}
