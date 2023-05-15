import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  userUpdaterService,
} from "../services/user.services";
import { TCreateUser, TUpdateUser } from "../interfaces";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TCreateUser = req.body;

  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsers = await getUsersService();
  return res.status(200).json(allUsers);
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserService(Number(req.params.id));
  return res.status(204).json({});
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUpdateUser = req.body;
  const userUpdated = await userUpdaterService(userData, Number(req.params.id));
  return res.status(200).json(userUpdated);
};
