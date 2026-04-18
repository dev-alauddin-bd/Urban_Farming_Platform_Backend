import { TokenPayload } from "../utils/generateTokens.ts";

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}
