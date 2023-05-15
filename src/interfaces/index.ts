import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Address, Category } from "../entities";
import {
  returnSchemaAddressData,
  createSchemaAddressData,
} from "../schemas/addresses.schema";
import {
  createSchemaCategoryData,
  returnSchemaCategoryData,
  allSchemaCategoryData,
} from "../schemas/category.schema";
import { loginSchema } from "../schemas/login.schema";
import { createSchemaRealEstateData } from "../schemas/realEstate.schema";
import { createSchema } from "../schemas/user.schema";
import { createSchemaScheduleData } from "../schemas/schedules.schema";

export type TCreateUser = z.infer<typeof createSchema>;

export type TLoginData = z.infer<typeof loginSchema>;

export type TCreateSchedule = z.infer<typeof createSchemaScheduleData>;

export type TUpdateUser = DeepPartial<TCreateUser>;

export type TCreateRealEstate = z.infer<typeof createSchemaRealEstateData>;
