import express, { Router } from "express";
import { AuthController } from "./auth.controller.js";

const router = express.Router();

// ================= REGISTER =================
router.post("/register", AuthController.registerUser);

// ================= LOGIN =================
router.post("/login", AuthController.loginUser);

// ================= LOGOUT =================
router.post("/logout", AuthController.logoutUser);

// ================= REFRESH TOKEN =================
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes: Router = router;