import { Router } from "express";
import { verifyBodyLogin, verifyLogin } from "../middleware";
import { login } from "../controllers/login.controller";

export const loginRouter = Router();

loginRouter.post("/login", verifyBodyLogin, verifyLogin, login);
