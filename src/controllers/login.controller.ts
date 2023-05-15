import { Request, Response } from "express";
import { loginService } from "../services/login.services";
import { TLoginData } from "../interfaces";

export const login = async (req: Request, res: Response): Promise<Response> => {
  const loginData: TLoginData = req.body;
  const session = await loginService(loginData);
  return res.status(200).json(session);
};
