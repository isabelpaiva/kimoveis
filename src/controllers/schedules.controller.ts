import { Request, Response } from "express";
import {
  createSchedulesService,
  getSchedulesService,
} from "../services/schedules.services";

export const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = res.locals.user.id;
  const schedule = await createSchedulesService(req.body, userId);

  return res.status(201).json(schedule);
};

export const getSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schedules = await getSchedulesService(Number(req.params.id));

  return res.status(200).json(schedules);
};
