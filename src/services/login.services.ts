import Jwt from "jsonwebtoken";
import { userRepository } from "../repositories";
export const loginService = async (payload: any) => {
  const user = await userRepository.findOneBy({ email: payload.email });
  return {
    token: Jwt.sign({ email: user!.email }, process.env.SECRET_KEY!, {
      subject: user?.id.toString(),
      expiresIn: 24,
    }),
  };
};
