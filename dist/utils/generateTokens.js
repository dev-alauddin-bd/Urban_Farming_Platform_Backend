import jwt from "jsonwebtoken";
import config from "../config/index.js";
// ============================== Generate Tokens ==============================
const generateTokens = (payload) => {
    // =========================== Access token ============================
    const accessToken = jwt.sign({ ...payload }, config.jwt_access_secret, {
        expiresIn: config.jwt_access_expires_in
    });
    // ========================== Refresh Token ============================
    const refreshToken = jwt.sign({ ...payload }, config.jwt_refresh_secret, {
        expiresIn: config.jwt_refresh_expires_in
    });
    return { accessToken, refreshToken };
};
export default generateTokens;
//# sourceMappingURL=generateTokens.js.map