import {
  adressesRepository,
  categoryRepository,
  realEstateRepository,
} from "../repositories";

export const createRealEstateService = async (payload: any) => {
  const address: any = await adressesRepository.create(payload.address);
  await adressesRepository.save(address);

  const categoryFind = await categoryRepository.findOneBy({
    id: Number(payload.categoryId),
  });

  const estate = realEstateRepository.create({
    ...payload,
    address,
    category: categoryFind,
  });
  await realEstateRepository.save(estate);


  return estate;
};

export const getRealEstateSErvice = async () => {
  const findRealEstate = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });
  return findRealEstate;
};
