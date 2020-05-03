import { Router } from "express";

import usersRouter from "./user.routes";
import sessionsRouter from "./sessions.routes";
import businessRouter from "./business.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/business", businessRouter);

export default routes;
