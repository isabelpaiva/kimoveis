import { userRepository } from "../repositories";
import { returnSchema } from "../schemas/user.schema";

export const createUserService = async (payload: any) => {
  const newUser = await userRepository.create({ ...payload });
  await userRepository.save(newUser);

  return { ...newUser, password: undefined };
};

export const getUsersService = async () => {
  return await userRepository.find({
    select: [
      "id",
      "updatedAt",
      "createdAt",
      "deletedAt",
      "admin",
      "email",
      "isActive",
      "name",
    ],
  });
};

export const deleteUserService = async (id: number) => {
  return await userRepository.softDelete({ id });
};

export const userUpdaterService = async (payload: any, id: number) => {
  const user = await userRepository.findOneBy({ id });
  const userUpdated = await userRepository.create({ ...user, ...payload });
  await userRepository.save(userUpdated);
  const returnUser = returnSchema.parse(userUpdated);

  return returnUser;
};
