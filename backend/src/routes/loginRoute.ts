import express from "express";
import { body } from "express-validator";
import { login, register, registerOwner } from "../controllers/loginController";
import { authMiddleWare, session } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/auth", authMiddleWare, session);
router.post("/login", login);

router.post(
  "/register/restaurant",
  [body("email").isEmail().withMessage("Invalid Email")],
  registerOwner
);

router.post(
  "/register",
  [body("email").isEmail().withMessage("Invalid Email")],
  register
);

export default router;
