import express from "express";
import { AuthController } from "./auth.controller.js";
const router = express.Router();
// ============================================ Register =============================================
router.post("/register", AuthController.registerUser);
// ============================================ Login =============================================
router.post("/login", AuthController.loginUser);
// ============================================ Logout =============================================
router.post("/logout", AuthController.logoutUser);
// ============================================ Refresh Token =============================================
router.post("/refresh-token", AuthController.refreshToken);
export const AuthRoutes = router;
//# sourceMappingURL=auth.route.js.map