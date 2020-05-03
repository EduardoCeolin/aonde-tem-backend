import { Router, json } from "express";

import ensureAuthenticated from "../middleware/ensureAuthenticated";
import CreateBusinessService from "../services/CreateBusinessService";
import CreateBusinessAddressService from "../services/CreateBusinessAddressService";
import AddProductService from "../services/AddProductService";
import AddServiceService from "../services/AddServiceService";

const businessRouter = Router();

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
