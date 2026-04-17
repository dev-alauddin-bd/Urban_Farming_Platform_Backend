import { Request, Response } from 'express';
export declare const ProduceController: {
    createProduce: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllProduces: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleProduce: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateProduce: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteProduce: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
