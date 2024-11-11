import express from "express";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { login, register } from "../validations/user.validation.js";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", validateMiddleware(register), registerController);
authRouter.post("/login", validateMiddleware(login), loginController);

export default authRouter;
