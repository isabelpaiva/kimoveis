import { RealEstate } from "../entities";
import { AppError } from "../error";
import { categoryRepository, realEstateRepository } from "../repositories";

export const createCategoryService = async (payload: any) => {
  const newCategorie = await categoryRepository.create({ ...payload });
  return await categoryRepository.save(newCategorie);
};

export const getCategoriesService = async () => {
  return await categoryRepository.find();
};

export const getCategoriesRealEstateService = async (id: number) => {
  const result = await categoryRepository.findOne({
    where: {
      id,
    },
    relations: {
      realEstate: true,
    },
  });
  return result;
};
