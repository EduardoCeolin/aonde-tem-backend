import { Router, json } from "express";

import ensureAuthenticated from "../middleware/ensureAuthenticated";
import CreateBusinessService from "../services/CreateBusinessService";
import CreateBusinessAddressService from "../services/CreateBusinessAddressService";
import AddProductService from "../services/AddProductService";
import AddServiceService from "../services/AddServiceService";
import { getRepository } from "typeorm";
import Business from "../models/Business";
import AppError from "../errors/AppError";

const businessRouter = Router();

businessRouter.get("/", ensureAuthenticated, async (request, response) => {
  const businessRepository = getRepository(Business);
  const business = await businessRepository.find();

  return response.json(business);
});

businessRouter.get("/find", ensureAuthenticated, async (request, response) => {
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

businessRouter.post("/", ensureAuthenticated, async (request, response) => {
  const business = request.body;
  const user_id = request.user.id;
  const createBusinessService = new CreateBusinessService();
  const createBusinessAddress = new CreateBusinessAddressService();

  const newBusiness = await createBusinessService.execute({
    user_id,
    business,
  });

  const businessAddress = await createBusinessAddress.execute(
    newBusiness.id,
    business.address
  );

  newBusiness.address = businessAddress;

  return response.json(newBusiness);
});

businessRouter.post(
  "/product",
  ensureAuthenticated,
  async (request, response) => {
    const productToAdd = request.body;

    const addProductService = new AddProductService();
    const productCreated = await addProductService.execute(productToAdd);

    return response.json(productCreated);
  }
);

businessRouter.post(
  "/service",
  ensureAuthenticated,
  async (request, response) => {
    const serviceToAdd = request.body;

    const addServiceService = new AddServiceService();
    const serviceCreated = await addServiceService.execute(serviceToAdd);

    return response.json(serviceCreated);
  }
);

export default businessRouter;
