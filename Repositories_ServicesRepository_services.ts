import { DeleteServices, InsertServices, SelectServices, UpdateServices } from "~/src/controllers/Services/types";

export interface ServicesRepository {
      postServices(insertServices : InsertServices): Promise<returnReponseServices>;
      putServices(updateServices : UpdateServices): Promise<returnReponseServices>;
      getServices(getServices: SelectServices): Promise<returnReponseServicesData>;
      deleteServices(deleteServices: DeleteServices): Promise<returnReponseServices>;
}

export interface returnReponseServicesData {
    status: string;
    data: Array<ServicesGet>;
  }
  
export interface ServicesGet {
    id_servico: number,
  }

export interface returnReponseServices {
    status: string;
    data: Array<ServicesAll>;
  }
  
  export interface ServicesAll {
    id_servico: number
  }  
