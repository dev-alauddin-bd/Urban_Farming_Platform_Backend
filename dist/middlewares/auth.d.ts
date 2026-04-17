import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
declare const auth: (...requiredRoles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default auth;
