class AppError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError;
//# sourceMappingURL=AppError.js.map