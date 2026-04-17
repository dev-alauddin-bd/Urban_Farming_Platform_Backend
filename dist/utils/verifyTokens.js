import jwt from "jsonwebtoken";
import config from "../config/index.js";
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.jwt_refresh_secret);
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.jwt_access_secret);
};
//# sourceMappingURL=verifyTokens.js.map