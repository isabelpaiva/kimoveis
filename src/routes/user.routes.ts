import { Router } from "express";
import {
  verifyAuth,
  verifyBody,
  verifyBodyUpdate,
  verifyEmail,
  verifyUser,
} from "../middleware";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { createSchema } from "../schemas/user.schema";

export const userRoutes = Router();

userRoutes.post("/users", verifyEmail, verifyBody, createUser);
userRoutes.get("/users", verifyAuth, getUsers);
userRoutes.patch(
  "/users/:id",
  verifyUser,
  verifyAuth,
  verifyBodyUpdate,
  updateUser
);
userRoutes.delete("/users/:id", verifyUser, verifyAuth, deleteUser);
