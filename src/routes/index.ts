import { Router } from "express";

const routes = Router();

routes.use("/teste", (req, res) => {
  return res.status(200).json({ Teste: "ok" });
});

export default routes;
