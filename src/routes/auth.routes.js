import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  getProfile,
  updateUser,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, getProfile);
router.post("/update/:id", verifyToken, updateUser); // Cambiado a POST

export default router;
