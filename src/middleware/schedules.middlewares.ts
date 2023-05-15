import { NextFunction, Request, Response } from "express";
import { realEstateRepository, schedulesRepository } from "../repositories";
import { TCreateSchedule } from "../interfaces";

export const verifySchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  const schedulesInfo: TCreateSchedule = req.body;
  const userId: string = res.locals.user.id;

  const estate = await realEstateRepository.findOneBy({
    id: req.body.realEstateId,
  });

  if (!estate) {
    return res.status(404).json({ message: "RealEstate not found" });
  }

  const schedulesBuilderHour = await schedulesRepository
    .createQueryBuilder("schedules_appointment")
    .where("schedules_appointment.date = :date", {
      date: schedulesInfo.date,
    })
    .andWhere("schedules_appointment.realEstate = :estate", {
      estate: schedulesInfo.realEstateId,
    })
    .andWhere("schedules_appointment.hour = :hour", {
      hour: schedulesInfo.hour,
    })
    .getOne();

  if (schedulesBuilderHour) {
    return res.status(409).json({
      message:
        "Schedule to this real estate at this date and time already exists",
    });
  }

  const schedulesBuilderUser = await schedulesRepository
    .createQueryBuilder("schedules_appointment")
    .where("schedules_appointment.date = :date", {
      date: schedulesInfo.date,
    })
    .andWhere("schedules_appointment.hour = :hour", {
      hour: schedulesInfo.hour,
    })
    .andWhere("schedules_appointment.userId = :id", { id: userId })
    .getOne();

  if (schedulesBuilderUser) {
    return res.status(409).json({
      message:
        "User schedule to this real estate at this date and time already exists",
    });
  }

  const schedulesBuilderUserRealEstate = await schedulesRepository
    .createQueryBuilder("schedules_appointment")
    .where("schedules_appointment.userId = :id", {
      id: userId,
    })
    .andWhere("schedules_appointment.realEstate = :estate", {
      estate: schedulesInfo.realEstateId,
    })
    .getOne();

  if (schedulesBuilderUserRealEstate) {
    return res.status(409).json({
      message: "User schedule to this real estate already exists",
    });
  }

  const [hourString] = schedulesInfo.hour.split(":");
  if (Number(hourString) < 8 || Number(hourString) > 18) {
    return res.status(400).json({
      message: "Invalid hour, available times are 8AM to 18PM",
    });
  }

  const diaUtil: Date = new Date(schedulesInfo.date);
  const day: number = diaUtil.getDay();
  diaUtil.getHours();
  if (day === 0 || day === 6) {
    return res.status(400).json({
      message: "Invalid date, work days are monday to friday",
    });
  }
  return next();
};
