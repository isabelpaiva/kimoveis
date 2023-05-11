import { categoryRepository, realEstateRepository } from "../repositories";

export const createCategoryService = async (payload: any) => {
  const newCategorie = await categoryRepository.create({ ...payload });
  return await categoryRepository.save(newCategorie);
};

export const getCategoriesService = async () => {
  return await categoryRepository.find();
};

export const getCategoriesRealEstateService = async (id: number) => {
  const category = await categoryRepository.findOneBy({ id });
  const result = await realEstateRepository.find({
    where: {
      categoryId: {
        id,
      },
    },
  });
  console.log(result);

  return { ...category, estate: result };
};
