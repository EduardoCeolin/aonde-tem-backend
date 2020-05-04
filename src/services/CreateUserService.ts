import { hash } from "bcryptjs";
import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import User from "../models/User";

interface Request {
  name: string;
  email: string;
  password: string;
  business: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    business,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      business,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
