import { Request, Response } from "express";
import {
  createRealEstateService,
  getRealEstateSErvice,
} from "../services/realEstate.services";
import { TCreateRealEstate } from "../interfaces";

export const createRealEstate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: TCreateRealEstate = req.body;
  const newRealEstate = await createRealEstateService(realEstateData);
  return res.status(201).json(newRealEstate);
};

export const getRealEstate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newRealEstate = await getRealEstateSErvice();
  return res.status(200).json(newRealEstate);
};
