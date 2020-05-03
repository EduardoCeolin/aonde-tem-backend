import { getRepository } from "typeorm";
import Address from "../models/Address";
import GetAddressIDMapsService from "./GetAddressIDMapsService";

class CreateBusinessAddressService {
  public async execute(
    business_id: string,
    address: Address
  ): Promise<Address> {
    const addressRepository = getRepository(Address);

    const getAddressIDMapsService = new GetAddressIDMapsService();
    const place_id = await getAddressIDMapsService.execute(address);

    const businessAddress = addressRepository.create({
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      cep: address.cep,
      complement: address.complement,
      place_id: place_id,
      business_id: business_id,
    });

    await addressRepository.save(businessAddress);

    return businessAddress;
  }
}
export default CreateBusinessAddressService;
