import { Request, Response } from 'express';
export declare const RentalSpaceController: {
    createRentalSpace: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllRentalSpaces: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleRentalSpace: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateRentalSpace: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteRentalSpace: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
