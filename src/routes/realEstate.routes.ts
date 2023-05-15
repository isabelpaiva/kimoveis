import { Router } from "express";

import {
  createRealEstate,
  getRealEstate,
} from "../controllers/realEstate.controller";
import { verifyAddress, verifyAuth, verifyRealEstate } from "../middleware";



export const realEstateRouter = Router();

realEstateRouter.post(
  "/realEstate",
  verifyAuth,
  verifyRealEstate,
  verifyAddress,
  createRealEstate
);

realEstateRouter.get("/realEstate", getRealEstate);
