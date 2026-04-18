import express from "express";
import { UserController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
const router = express.Router();
// ================= MY PROFILE =================
router.get("/me", auth(UserRole.CUSTOMER, UserRole.VENDOR, UserRole.ADMIN), UserController.getMyProfile);
// ================= UPDATE MY PROFILE =================
router.patch("/me", auth(UserRole.CUSTOMER, UserRole.VENDOR, UserRole.ADMIN), UserController.updateMyProfile);
// ================= GET ALL USERS =================
router.get("/", auth(UserRole.ADMIN), UserController.getAllUsers);
// ================= GET SINGLE USER =================
router.get("/:id", auth(UserRole.ADMIN), UserController.getSingleUser);
// ================= CHANGE STATUS =================
router.patch("/:id/status", auth(UserRole.ADMIN), UserController.changeUserStatus);
// ================= DELETE USER =================
router.delete("/:id", auth(UserRole.ADMIN), UserController.deleteUser);
export const UserRoutes = router;
//# sourceMappingURL=user.route.js.map