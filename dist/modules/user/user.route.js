import express from "express";
import { UserController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
const router = express.Router();
// ================= Get my profile =================
router.get("/me", auth(), UserController.getMyProfile);
// ================= Update my profile =================
router.patch("/me", auth(), UserController.updateMyProfile);
// ================= Get all users (Admin only) =================
router.get("/", auth(UserRole.ADMIN), UserController.getAllUsers);
// ================= Get single user (Admin only) =================
router.get("/:id", auth(UserRole.ADMIN), UserController.getSingleUser);
// ================= Change user status (Admin only) =================
router.patch("/:id/status", auth(UserRole.ADMIN), UserController.changeUserStatus);
// ================= Delete user (Admin only) =================
router.delete("/:id", auth(UserRole.ADMIN), UserController.deleteUser);
export const UserRoutes = router;
//# sourceMappingURL=user.route.js.map