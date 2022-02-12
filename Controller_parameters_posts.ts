import { BadRequest } from "@tksolution/tks-datasource-api-core";
import Joi from "joi";

export const insertPosts =
    Joi.object({
        id_pessoa: Joi.number()
            .required()
            .error(() => new BadRequest('The person is required'))
            .description('The person')
            .example(1)
            .example(2),
        dt_post: Joi.date()
            .required()
            .error(() => new BadRequest('The post date is required'))
            .description('The post date')
            .example('05/02/2022')
            .example(2),
        ds_mensagem: Joi.string()
            .required()
            .error(() => new BadRequest('The message is required'))
            .description('The message')
            .example('Excellent and explanatory text')
            .example('Evidence for verification is lacking')    
    })

export const getPosts =
    Joi.object({
        id_pessoa: Joi.number()
            .optional()
            .error(() => new BadRequest('The person sould be a number'))
            .description('The person')
            .example(1)
            .example(2),
        dt_post: Joi.date()
            .optional()
            .error(() => new BadRequest('The post date should be a date'))
            .description('The post date')
            .example('05/02/2022')
            .example(2),
        in_todos: Joi.string()
            .required()
            .error(() => new BadRequest('The all indicator is required'))
            .description('The all indicator')
            .example('S')
            .example('N')    
    })

export const updatePosts =
Joi.object({
    id_pessoa: Joi.number()
        .required()
        .error(() => new BadRequest('The person is required'))
        .description('The person')
        .example(1)
        .example(2),
    dt_post: Joi.date()
        .required()
        .error(() => new BadRequest('The post date is required'))
        .description('The post date')
        .example('05/02/2022 10:00:00')
        .example(2),
    ds_mensagem: Joi.string()
        .required()
        .error(() => new BadRequest('The message is required'))
        .description('The message')
        .example('Excellent and explanatory text')
        .example('Evidence for verification is lacking')        
    });

    export const delPosts =
    Joi.object({
        id_pessoa: Joi.number()
            .optional()
            .error(() => new BadRequest('The person sould be a number'))
            .description('The person')
            .example(1)
            .example(2),    
        dt_post: Joi.date()
            .optional()
            .error(() => new BadRequest('The post date should be a date'))
            .description('The post date')
            .example('05/02/2022')
            .example(2),    
    })
