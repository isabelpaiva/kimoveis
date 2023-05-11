import { Request, Response } from "express";
import { loginService } from "../services/login.services";

export const login = async (req: Request, res: Response) => {
  const session = await loginService(req.body);
  return res.status(200).json(session);
};
