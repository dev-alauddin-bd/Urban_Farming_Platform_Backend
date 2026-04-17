import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import AppError from "../error/AppError.js";
import catchAsync from "../utils/catchAsync.js";
const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        let token = req.headers.authorization || req.cookies?.accessToken;
        // Extract token from Bearer
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        // 1. Check if token is provided
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }
        // 2. Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, config.jwt_access_secret);
        }
        catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token!");
        }
        // 3. Check if user has required role
        if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
            throw new AppError(httpStatus.FORBIDDEN, "You do not have permission to access this resource!");
        }
        // 4. Attach user to request
        req.user = decoded;
        next();
    });
};
export default auth;
//# sourceMappingURL=auth.js.map