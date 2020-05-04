import {
  Client,
  Status,
  PlaceInputType,
} from "@googlemaps/google-maps-services-js";
import Address from "../models/Address";

class GetAddressIDMapsService {
  public async execute(address: Address): Promise<string> {
    const client = new Client({});

    const place_id = await client
      .findPlaceFromText({
        params: {
          input:
            address.street +
            " " +
            address.number +
            " " +
            address.neighborhood +
            " " +
            address.city +
            " " +
            address.state +
            " " +
            address.cep,
          inputtype: PlaceInputType.textQuery,
          fields: undefined,
          locationbias: undefined,
          language: undefined,
          key: process.env.API_KEY || "",
        },
        timeout: 1000, // milliseconds
      })
      .then((r: any) => {
        if (r.data.status === Status.OK) {
          return r.data.candidates[0].place_id as string;
        } else {
          throw Error("Erro ao procurar place_id");
        }
      })
      .catch((e) => {
        throw Error(e);
      });

    return place_id;
  }
}
export default GetAddressIDMapsService;
