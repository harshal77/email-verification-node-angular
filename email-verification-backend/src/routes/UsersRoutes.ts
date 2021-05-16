import { userLoginModel, userCreationModel, idInParmsModel, resendEmailModel } from './../validations/Validations';
import * as Hapi from '@hapi/hapi';
import { Response } from '../classes/Response';
import { StatusCodes } from '../classes/StatusCodes';
import UserController from '../controllers/UserController';

export default function (server: Hapi.Server) {

    const controller = new UserController(server);

    server.bind(controller);


    server.route({
        method: 'POST',
        path: '/login',
        options: {
            handler: controller.userLogin,
            tags: ['api'],
            description: 'Login user Api',
            auth: false,
            validate: {
                payload: userLoginModel,
                failAction: async (request, h, err) => {

                    if (err) {

                        let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                        return h.response(response).code(response.getStatusCode()).takeover();

                    } else {

                        return h.continue;
                    }
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/sign-up',
        options: {
            handler: controller.handleCreateEntry,
            tags: ['api'],
            description: 'Create User Api',
            auth: false,
            validate: {
                payload: userCreationModel,
                failAction: async (request, h, err) => {

                    if (err) {

                        let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                        return h.response(response).code(response.getStatusCode()).takeover();

                    } else {

                        return h.continue;
                    }
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/resend-email',
        options: {
            handler: controller.resendEmail,
            tags: ['api'],
            description: 'Resend email user Api',
            auth: false,
            validate: {
                payload: resendEmailModel,
                failAction: async (request, h, err) => {

                    if (err) {

                        let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                        return h.response(response).code(response.getStatusCode()).takeover();

                    } else {

                        return h.continue;
                    }
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/verify-email/{id}',
        options: {
            handler: controller.verifyEmail,
            tags: ['api'],
            description: 'Verify email user Api',
            auth: false,
            validate: {
                params: idInParmsModel,
                failAction: async (request, h, err) => {

                    if (err) {

                        let response = new Response(false, StatusCodes.NOT_ACCEPTABLE, err.message, {});
                        return h.response(response).code(response.getStatusCode()).takeover();

                    } else {

                        return h.continue;
                    }
                }
            }
        }
    });


}