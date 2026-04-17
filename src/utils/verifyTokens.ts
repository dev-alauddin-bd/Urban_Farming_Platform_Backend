import jwt, { Secret } from "jsonwebtoken";
import config from "../config/index.js";
import { TokenPayload } from "./generateTokens.js";

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    config.jwt_refresh_secret as Secret
  ) as TokenPayload;
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(
    token,
    config.jwt_access_secret as Secret
  ) as TokenPayload;
};