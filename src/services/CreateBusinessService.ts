import { getRepository } from "typeorm";
import Business from "../models/Business";

interface RequestDTO {
  user_id: string;
  business: Business;
}

class CreateBusinessService {
  public async execute({ user_id, business }: RequestDTO): Promise<Business> {
    const businessRepository = getRepository(Business);

    const newBusiness = businessRepository.create({
      avatar: business.avatar,
      nome: business.nome,
      setor: business.setor,
      cnpj_cpf: business.cnpj_cpf,
      openHour: business.openHour,
      closeHour: business.closeHour,
      instagram: business.instagram,
      facebook: business.facebook,
      whatsapp: business.whatsapp,
      fone_cel: business.fone_cel,
      user_id,
    });

    await businessRepository.save(newBusiness);

    return newBusiness;
  }
}
export default CreateBusinessService;
