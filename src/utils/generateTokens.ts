import jwt, { Secret, SignOptions } from "jsonwebtoken"
import config from "../config/index.js";
//  jwt payload

export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}


// ============================== Generate Tokens ==============================

const generateTokens = (payload: TokenPayload) => {


    // =========================== Access token ============================

    const accessToken = jwt.sign({ ...payload }, config.jwt_access_secret as Secret, {
        expiresIn: config.jwt_access_expires_in as SignOptions['expiresIn']
    })


    // ========================== Refresh Token ============================

    const refreshToken = jwt.sign({ ...payload }, config.jwt_refresh_secret as Secret, {
        expiresIn: config.jwt_refresh_expires_in as SignOptions['expiresIn']
    })

    return { accessToken, refreshToken }

}
export default generateTokens;




