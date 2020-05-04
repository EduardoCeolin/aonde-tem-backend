import { getRepository } from "typeorm";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import AppError from "../errors/AppError";
import User from "../models/User";
import sessionsRouter from "./sessions.routes";
import AuthenticateUserService from "../services/AuthenticateUserService";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password, business } = request.body;

    const createUser = new CreateUserService();

    const userCreated = await createUser.execute({
      name,
      email,
      password,
      business,
    });

    if (!userCreated) {
      throw new AppError("Erro ao criar usuario");
    }

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    if (!user || !token) {
      throw new AppError("Erro logar usuário");
    }

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
);

export default usersRouter;
