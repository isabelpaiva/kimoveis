import { Router } from "express";
import {
  verifyAuth,
  verifyAuthAdmin,
  verifyAuthSchedule,
  verifyScheduleBody,
  verifyUser,
} from "../middleware";
import { verifySchedule } from "../middleware/schedules.middlewares";
import {
  createSchedulesController,
  getSchedulesController,
} from "../controllers/schedules.controller";

export const schedulesRouter = Router();

schedulesRouter.post(
  "/schedules",
  verifyAuthSchedule,
  verifyScheduleBody,
  verifySchedule,
  createSchedulesController
);
schedulesRouter.get(
  "/schedules/realEstate/:id",
  verifyAuthAdmin,
  getSchedulesController
);
