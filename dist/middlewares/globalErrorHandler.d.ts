import { NextFunction, Request, Response } from "express";
declare const globalErrorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void;
export default globalErrorHandler;
