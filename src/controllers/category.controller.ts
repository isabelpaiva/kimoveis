import { Request, Response } from "express";
import {
  createCategoryService,
  getCategoriesRealEstateService,
  getCategoriesService,
} from "../services/category.services";

export const createCategory = async (req: Request, res: Response) => {
  const newCategorie = await createCategoryService(req.body);
  return res.status(201).json(newCategorie);
};

export const getCategory = async (req: Request, res: Response) => {
  const allCategories = await getCategoriesService();
  return res.status(200).json(allCategories);
};

export const getCategoryRealEstate = async (req: Request, res: Response) => {
  const allCategories = await getCategoriesRealEstateService(
    Number(req.params.id)
  );
  return res.status(200).json(allCategories);
};
