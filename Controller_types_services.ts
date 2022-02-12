import { BasePathSchema } from '@tksolution/tks-datasource-api-core';

export interface InsertServices extends BasePathSchema {
    id_servico: string;
    ds_servico: string;
}

export interface UpdateServices extends BasePathSchema {
  id_servico: string;
  ds_servico: string;
}

export interface SelectServices extends BasePathSchema {
    id_servico: string;
}

export interface DeleteServices extends BasePathSchema {
    id_servico: string;
    dt_canc: string; 
}
export interface ErrorResponse {
  code: string;
  message: string;
}

export interface SucessResponse {
  status: string;
}

/*export interface returGetReponseServicesData {
    data:Array<returGetReponseServices>
}


export interface returReponseServices {
  status: string;
  id_servico: number;
}

export interface returGetReponseServices {
  status: string;
  id_servico: number;
  ds_servico: string;
}

export interface returReponseServicesData {
  status: string;
  data:Array<returReponseServices>
}

export interface ReturnDataResponse {
  status: string;
}
*/