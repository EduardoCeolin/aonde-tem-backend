import { Router } from "express";

import ensureAuthenticated from "../middleware/ensureAuthenticated";
import CreateBusinessService from "../services/CreateBusinessService";
import CreateBusinessAddressService from "../services/CreateBusinessAddressService";

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

export default businessRouter;
