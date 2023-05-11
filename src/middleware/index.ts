import { NextFunction, Request, Response } from "express";
import { categoryRepository, userRepository } from "../repositories";
import { createSchema, updateSchema } from "../schemas/user.schema";
import { loginSchema } from "../schemas/login.schema";
import * as bycriptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { AppError } from "../error";
import { decode } from "punycode";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const emailExists = await userRepository.findOneBy({ email });

  if (emailExists) {
    return res.status(409).json({ message: "Email already exists" });
  }

  return next();
};

export const verifyBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validateData = createSchema.parse(req.body);
    req.body = validateData;

    return next();
  } catch (error: any) {
    res.status(400).json({
      message: error.flatten().fieldErrors,
    });
  }
};

export const verifyBodyLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateData = loginSchema.parse(req.body);
    req.body = validateData;

    return next();
  } catch (error: any) {
    res.status(401).json({
      message: error.flatten().fieldErrors,
    });
  }
};

export const verifyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const emailExists = await userRepository.findOneBy({ email });

  if (!emailExists) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!(await bycriptjs.compare(password, emailExists.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  if (emailExists.isActive === false) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return next();
};

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token" });
  }

  const userToken = token.split(" ");

  Jwt.verify(
    userToken[1],
    String(process.env.SECRET_KEY),
    (err, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: err.message });
      }

      if (!decoded.admin && decoded.sub !== req.params.id) {
        return res.status(403).json({ message: "Insufficient permission" });
      }
    }
  );

  return next();
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.isActive) {
    return res.status(404).json({ message: "User not found" });
  }

  return next();
};

export const verifyBodyUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validateData = updateSchema.parse(req.body);
    req.body = validateData;
    console.log(validateData);

    return next();
  } catch (error: any) {
    res.status(400).json({
      message: error.flatten().fieldErrors,
    });
  }
};

export const verifyCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categorie = await categoryRepository.findOneBy({ name: req.body.name });

  if (categorie) {
    return res.status(409).json({ message: "Category already exists" });
  }

  return next();
};
