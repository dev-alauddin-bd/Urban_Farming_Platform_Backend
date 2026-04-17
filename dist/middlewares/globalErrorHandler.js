import config from "../config/index.js";
import AppError from "../error/AppError.js";
import { Prisma } from "@prisma/client";
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages = [];
    // ================= PRISMA ERROR =================
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = 400;
        message = "Database Error";
        errorMessages = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    // ================= CUSTOM APP ERROR =================
    else if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    // ================= NORMAL ERROR =================
    else if (error instanceof Error) {
        message = error.message;
        errorMessages = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    // ================= RESPONSE =================
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== "production" ? error.stack : undefined,
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map