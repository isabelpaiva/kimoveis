import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }

  console.log(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};
