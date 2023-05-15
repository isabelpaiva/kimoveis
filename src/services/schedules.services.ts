import { AppError } from "../error";
import {
  realEstateRepository,
  schedulesRepository,
  userRepository,
} from "../repositories";

export const createSchedulesService = async (
  payload: any,
  userId: number
): Promise<object> => {
  const userRepoResult = await userRepository.findOneBy({
    id: Number(userId),
  });

  let realEstateResult: any;

  if (payload.realEstateId) {
    realEstateResult = await realEstateRepository.findOneBy({
      id: Number(payload.realEstateId),
    });

    if (!realEstateResult) {
      throw new AppError("RealEstate not found", 404);
    }
  }

  const schedulesRepoCreate = schedulesRepository.create({
    ...payload,
    realEstate: realEstateResult!,
    user: userRepoResult!,
  });

  await schedulesRepository.save(schedulesRepoCreate);

  return { message: "Schedule created" };
};

export const getSchedulesService = async (realEstate: number) => {
  const realEstateFind = await realEstateRepository.findOne({
    where: {
      id: realEstate,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  return realEstateFind;
};
