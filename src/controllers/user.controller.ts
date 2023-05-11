import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  userUpdaterService,
} from "../services/user.services";

export const createUser = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);
  return res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const allUsers = await getUsersService();
  return res.status(200).json(allUsers);
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserService(Number(req.params.id));
  return res.status(204).json({});
};

export const updateUser = async (req: Request, res: Response) => {
  const userUpdated = await userUpdaterService(req.body, Number(req.params.id));
  return res.status(200).json(userUpdated);
};
