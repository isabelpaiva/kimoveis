import { Router } from "express";
import { verifyAuth, verifyCategory } from "../middleware";
import {
  createCategory,
  getCategory,
  getCategoryRealEstate,
} from "../controllers/category.controller";

export const categoryRouter = Router();

categoryRouter.post("/categories", verifyAuth, verifyCategory, createCategory);
categoryRouter.get("/categories", getCategory);
categoryRouter.get("/categories/:id/realEstate", getCategoryRealEstate);
