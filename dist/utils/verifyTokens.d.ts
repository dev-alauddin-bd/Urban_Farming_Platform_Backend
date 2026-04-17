import { TokenPayload } from "./generateTokens.js";
export declare const verifyRefreshToken: (token: string) => TokenPayload;
export declare const verifyAccessToken: (token: string) => TokenPayload;
