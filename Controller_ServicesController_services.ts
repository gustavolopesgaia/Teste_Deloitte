/*
 * Esse é o Controller responsavel por cadastrar, alterar, consultar ou inativar os serviços prestados pela companhia
 * Criado por gustavo.gaia, 05/02/2022
 * Deixe suas modificações aqui:
 *                               
 */
import { boundMethod } from 'autobind-decorator';
import { inject, injectable } from 'tsyringe';
import { DeleteServices, ErrorResponse, InsertServices, SelectServices, UpdateServices } from './types';
import { RegisteredCache, RegisteredServicesRepository } from '~/src/tokens';
import { BAD_REQUEST_ERROR,
         NOT_FOUND_ERROR,
         GET_SERVICES_SAMPLE_RESPONSE_200,
         PUT_SERVICES_SAMPLE_RESPONSE_200,
         POST_SERVICES_SAMPLE_RESPONSE_200,
         DELETE_SERVICES_SAMPLE_RESPONSE_200} from './responses';
import {
  Post,
  Put,
  Get,
  Tags,
  Cache,
  Trace,
  Response,
  Controller,
  Description,
  MethodRequest,
  Accept,
  Parameters,
  Delete} from '@tksolution/tks-datasource-api-core';
import { updateServices, getServices, insertServices, delServices  } from './parameters';
import { returnReponseServices, returnReponseServicesData, ServicesRepository } from '~/src/repositories/Services/ServicesRepository';
import { ReturnDataResponse } from '../Campaign/types';

@injectable()
@Controller('/api/v1/Services')
@Tags('gc-example')
export class ServicesController {
  constructor(
    @inject(RegisteredCache) protected cache: Cache,
    @inject(RegisteredServicesRepository) protected servicesRepository: ServicesRepository,
  ) {}

  @boundMethod
  @Post('/')
  @Accept('application/json')
  @Description('Inserts a service')
  @Parameters({ bodySchema: insertServices })
  @Response<ReturnDataResponse>(200, 'Service found', POST_SERVICES_SAMPLE_RESPONSE_200)
  @Response<ErrorResponse>(400, 'Bad request', BAD_REQUEST_ERROR)
  @Response<ErrorResponse>(404, 'Campaign not found', NOT_FOUND_ERROR)
  @Trace()
  async postService(request: MethodRequest<never, InsertServices>): Promise<returnReponseServices> {
   const { body: post_Services } = request;  
   const sReturnInc = await this.servicesRepository.postServices(post_Services); 
   return sReturnInc;
  }
  
  @boundMethod
  @Put('/')
  @Accept('application/json')
  @Description('Update a service')
  @Parameters({ bodySchema: updateServices})
  @Response<ReturnDataResponse>(200, 'Services found', PUT_SERVICES_SAMPLE_RESPONSE_200)
  @Response<ErrorResponse>(400, 'Bad request', NOT_FOUND_ERROR)
  @Response<ErrorResponse>(404, 'Service not found', NOT_FOUND_ERROR)
  @Trace()
  async putService(request: MethodRequest<never, UpdateServices>): Promise<returnReponseServices> {
   const { body: put_Services } = request;  
   const sReturnUpd = await this.servicesRepository.putServices(put_Services);
   return sReturnUpd;
  }

  @boundMethod
  @Get('/')
  @Description('Get a service')
  @Parameters({ queryStringParametersSchema: getServices })
  @Response<ReturnDataResponse>(200, 'Service found', GET_SERVICES_SAMPLE_RESPONSE_200)
  @Response<ErrorResponse>(400, 'Bad request', BAD_REQUEST_ERROR)
  @Response<ErrorResponse>(404, 'Service not found', NOT_FOUND_ERROR)
  @Trace()
  async getService(request: MethodRequest<never, never, SelectServices>): Promise<returnReponseServicesData> {
    const { query: get_Services } = request;
    const sReturnGet = await this.servicesRepository.getServices(get_Services);
    return sReturnGet;
  }

@boundMethod
  @Delete('/')
  @Accept('application/json')
  @Description('Delete services')
  @Parameters({ bodySchema: delServices })
  @Response<ReturnDataResponse>(200, 'Delete sucess', DELETE_SERVICES_SAMPLE_RESPONSE_200)
  @Response<ErrorResponse>(400, 'Bad request', BAD_REQUEST_ERROR)
  @Response<ErrorResponse>(404, 'Delete not found', NOT_FOUND_ERROR)
  @Trace()
  async deleteServices(request: MethodRequest<never, DeleteServices>): Promise<returnReponseServicesData> {
    const { body: delServices_Del } = request;
    const sRetornoDel = await this.servicesRepository.deleteServices(delServices_Del);
    return sRetornoDel;
  }
};