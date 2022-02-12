import { BadRequest } from "@tksolution/tks-datasource-api-core";
import Joi from "joi";

export const insertServices =
Joi.object({
      id_servico: Joi.number()
        .optional()
        .error(() => new BadRequest('The service should be a number'))
        .description('The identifier of campaign')
        .example(1)
        .example(2)
    })

export const getServices =
Joi.object({
      id_servico: Joi.number()
        .optional()
        .error(() => new BadRequest('The service should be a number'))
        .description('The identifier of campaign')
        .example(1)
        .example(2)
    })

export const updateServices = 
Joi.object({
    id_servico: Joi.number()
       .optional()
       .error(() => new BadRequest('The service should be a number'))
       .description('The service')
       .example(1)
       .example(2),
  dt_canc: Joi.number()
       .optional()
       .error(() => new BadRequest('The cancellation date should be a date'))
       .description('The cancellation date')
       .example(1)
       .example(2)    
    });

export const delServices = 
Joi.object({
    id_servico: Joi.number()
       .optional()
       .error(() => new BadRequest('The service should be a number'))
       .description('The service')
       .example(1)
       .example(2),
  dt_canc: Joi.number()
       .optional()
       .error(() => new BadRequest('The cancellation date should be a date'))
       .description('The cancellation date')
       .example(1)
       .example(2)    
    });
