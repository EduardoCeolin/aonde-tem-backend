import { getRepository } from "typeorm";
import Products from "../models/Products";
import Business from "../models/Business";
import AppError from "../errors/AppError";
import { isUuid } from "uuidv4";

class AddProductService {
  public async execute(product: Products): Promise<Products> {
    const productRepository = getRepository(Products);
    const businessRepository = getRepository(Business);

    const business_id_isUuid = isUuid(product.business_id);
    if (!business_id_isUuid) {
      throw new AppError("Business_id is not UUID.");
    }

    const business = await businessRepository.findOne({
      where: {
        id: product.business_id,
      },
    });
    if (!business) {
      throw Error("Business doesn't exists.");
    }

    const newProduct = productRepository.create({
      avatar: product.avatar,
      name: product.name,
      description: product.description,
      value: product.value,
      business_id: product.business_id,
    });

    await productRepository.save(newProduct);

    return newProduct;
  }
}
export default AddProductService;
