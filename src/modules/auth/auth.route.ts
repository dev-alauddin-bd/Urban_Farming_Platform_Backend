import express, { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { registerLimiter, loginLimiter } from "../../middlewares/rateLimiter.js";

const router = express.Router();

// ================= REGISTER =================
router.post("/register", registerLimiter, AuthController.registerUser);

// ================= LOGIN =================
router.post("/login", loginLimiter, AuthController.loginUser);

// ================= LOGOUT =================
router.post("/logout", AuthController.logoutUser);

// ================= REFRESH TOKEN =================
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes: Router = router;