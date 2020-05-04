import { getRepository } from "typeorm";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import AppError from "../errors/AppError";
import User from "../models/User";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password, business } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      business,
    });

    if (!user) {
      throw new AppError("Erro ao criar usuario");
    }

    delete user.password;

    return response.json(user);
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
