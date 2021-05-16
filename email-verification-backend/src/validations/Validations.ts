import * as Joi from "joi";
import { RouteOptionsResponseSchema } from "@hapi/hapi";



export const idInParmsModel: RouteOptionsResponseSchema = <RouteOptionsResponseSchema>Joi.object().keys({

    id: Joi.string().required()
});


export const userCreationModel: RouteOptionsResponseSchema = <RouteOptionsResponseSchema>Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
});


export const userLoginModel: RouteOptionsResponseSchema = <RouteOptionsResponseSchema>Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
});


export const resendEmailModel: RouteOptionsResponseSchema = <RouteOptionsResponseSchema>Joi.object().keys({
    userName: Joi.string().required(),
});

