import { returnReponseServices } from '~/src/repositories/Services/ServicesRepository';
import { ErrorResponse } from './types';

export const NOT_FOUND_ERROR: ErrorResponse[] = [
  {
    code: 'NOT_FOUND',
    message: 'The services could not be found',
  },
];

export const BAD_REQUEST_ERROR: ErrorResponse[] = [
  {
    code: 'BAD_REQUEST',
    message: 'Error to find Sevices',
  },
];

export const PUT_SERVICES_SAMPLE_RESPONSE_200: returnReponseServices[] = [
  {
    status: 'OK',
    data:[{
      id_servico: 1
    }]
  },
];

export const POST_SERVICES_SAMPLE_RESPONSE_200: returnReponseServices[] = [
  {
    status: 'OK',
    data:[{
      id_servico: 1
    }]
  }
];

export const GET_SERVICES_SAMPLE_RESPONSE_200: returnReponseServices[] = [
    {
      status: 'OK',
      data:[{
        id_servico: 1
      }]
    }
  ];

  export const DELETE_SERVICES_SAMPLE_RESPONSE_200: returnReponseServices[] = [
    {
      status: 'OK',
      data:[{
        id_servico: 1
      }]
    }
  ];
