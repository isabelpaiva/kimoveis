import { AppDataSource } from "../data-source";
import { Address } from "../entities/adresses.entitie";
import { Category } from "../entities/category.entitie";
import { RealEstate } from "../entities/realEstate.entitie";
import { Schedule } from "../entities/schedule.entitie";
import { User } from "../entities/user.entitie";

export const userRepository = AppDataSource.getRepository(User);
export const categoryRepository = AppDataSource.getRepository(Category);
export const realEstateRepository = AppDataSource.getRepository(RealEstate);
export const adressesRepository = AppDataSource.getRepository(Address);
export const schedulesRepository = AppDataSource.getRepository(Schedule);
