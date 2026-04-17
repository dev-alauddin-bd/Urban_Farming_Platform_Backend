import { Response } from 'express';
type IResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
    data?: T | null;
};
declare const sendResponse: <T>(res: Response, data: IResponse<T>) => void;
export default sendResponse;
