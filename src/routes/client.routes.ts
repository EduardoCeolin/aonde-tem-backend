import { getRepository } from "typeorm";
import { Router, json } from "express";

import ensureAuthenticated from "../middleware/ensureAuthenticated";
import CreateBusinessService from "../services/CreateBusinessService";
import CreateBusinessAddressService from "../services/CreateBusinessAddressService";
import AddProductService from "../services/AddProductService";
import AddServiceService from "../services/AddServiceService";
import Business from "../models/Business";
import AppError from "../errors/AppError";

const clietRouter = Router();

clietRouter.get(
  "/allbusiness",
  ensureAuthenticated,
  async (request, response) => {
    const businessRepository = getRepository(Business);
    const business = await businessRepository.find();

    return response.json(business);
  }
);

clietRouter.get("/business", ensureAuthenticated, async (request, response) => {
  const { business_id } = request.body;
  const businessRepository = getRepository(Business);
  const business = await businessRepository.findOne({
    where: { id: business_id },
  });

  if (!business) {
    throw new AppError("Business not found");
  }

  return response.json(business);
});

export default clietRouter;
