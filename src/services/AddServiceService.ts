import { getRepository } from "typeorm";
import { isUuid } from "uuidv4";
import Products from "../models/Products";
import Services from "../models/Services";
import Business from "../models/Business";
import AppError from "../errors/AppError";

class AddServiceService {
  public async execute(service: Services): Promise<Products> {
    const serviceRepository = getRepository(Services);
    const businessRepository = getRepository(Business);

    const business_id_isUuid = isUuid(service.business_id);
    if (!business_id_isUuid) {
      throw new AppError("Business_id is not UUID.");
    }

    const business = await businessRepository.findOne({
      where: {
        id: service.business_id,
      },
    });

    if (!business) {
      throw new AppError("Business doesn't exists.");
    }

    const newService = serviceRepository.create({
      avatar: service.avatar,
      name: service.name,
      description: service.description,
      value: service.value,
      business_id: service.business_id,
    });

    await serviceRepository.save(newService);

    return newService;
  }
}
export default AddServiceService;
