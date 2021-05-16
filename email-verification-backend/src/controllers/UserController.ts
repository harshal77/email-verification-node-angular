import * as Hapi from "@hapi/hapi";
import CommonCrudServiceImpl from "../services/CommonCrudServiceImpl";
import { DatabaseModelsInterface } from "..";
import { StatusCodes } from "../classes/StatusCodes";
import { Response } from "../classes/Response";
import { CustomMessages } from '../classes/CustomMessages';
const nodemailer = require("nodemailer");
import * as Configs from "../configurations";
import { ConfigurationSettingsInterface } from '../interfaces/config-interfaces/ConfigurationSettingsInterface';


export default class UserController {
  private userService: CommonCrudServiceImpl;

  constructor(server: Hapi.Server) {
    let mongo: DatabaseModelsInterface = global["mongo"];
    this.userService = new CommonCrudServiceImpl(mongo.UserModel);
  }

  public async handleCreateEntry(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    let response: Response;

    try {

      let condition: any = { is_deleted: 0 };
      condition["email"] = request.payload["email"];
      const randomKey = `${new Date().valueOf()}`;
      request.payload['random_key'] = randomKey;
      response = await this.userService.createOrFindEntry(request.payload, condition);
      console.log('bhai result resp');

      let result = response.getResult();
      console.log('bhai result', result);
      if (result && result.length > 0) {


        const obj = {
          name: `${request.payload['firstName']} ${request.payload['lastName']}`,
          email: request.payload["email"],
          randomKey: randomKey
        }
        const emailResponse = await this.sendMail(obj);
        console.log('emailResponse', emailResponse);

        response = new Response(true, StatusCodes.OK, CustomMessages.SUCCESS, result);

      } else {

        response = new Response(false, StatusCodes.UNAUTHORIZED, CustomMessages.UNAUTHORIZED, {});
      }
    } catch (err) {
      response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
    }

    return h.response(response).code(response.getStatusCode());
  }

  public async sendMail(userData) {
    const allConfigurations: ConfigurationSettingsInterface = Configs.getConfigurations();
    const url = `http://localhost:4200/#/verify-email/${userData.randomKey}`
    let transport = nodemailer.createTransport({
      host: "smtp.googlemail.com",
      port: 465,
      auth: {
        user: allConfigurations.senderMail.email,
        pass: allConfigurations.senderMail.password
      }
    });
    let info = await transport.sendMail({
      from: `"Email verification Demo" ${allConfigurations.senderMail.email}`,
      to: userData.email,
      subject: 'Email Verification',
      html: `<h1>Hi ${userData.name},</h1> <br>
      <h4>Thank you for joining.Please verify your account on clicking below link</h4>
       ${url}`
    });
    return info;
  }
  public async userLogin(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    let response: Response;

    try {
      let condition: any = {
        is_deleted: 0
      };

      condition["email"] = request.payload["userName"];
      condition["password"] = request.payload["password"];

      response = await this.userService.findEntry(condition);
      let result = response.getResult();
      if (result && result.length > 0) {
        if (+(result[0].isVerified) === 1) {

          response = new Response(true, StatusCodes.OK, CustomMessages.SUCCESS, result);
        } else {
          response = new Response(false, StatusCodes.NOT_VERIFIED, CustomMessages.NOT_VERIFIED, {});
        }

      } else {

        response = new Response(false, StatusCodes.UNAUTHORIZED, CustomMessages.UNAUTHORIZED, {});
      }


    } catch (err) {

      response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});

    }

    return h.response(response).code(response.getStatusCode());
  }

  public async resendEmail(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    let response: Response;

    try {
      let condition: any = {
        is_deleted: 0
      };

      condition["email"] = request.payload["userName"];
      response = await this.userService.findEntry(condition);
      let result = response.getResult();

      if (result && result.length > 0) {
        if (result[0].email === condition["email"]) {
          const obj = {
            name: `${result[0].firstName} ${result[0].lastName}`,
            email: request.payload["userName"],
            randomKey: result[0].randomKey
          };
          const emailResponse = await this.sendMail(obj);
          response = new Response(true, StatusCodes.OK, CustomMessages.SENT_EMAIL, {});
        } else {
          response = new Response(false, StatusCodes.NOT_FOUND, CustomMessages.NOT_PRESENT, {});
        }

      } else {

        response = new Response(false, StatusCodes.UNAUTHORIZED, CustomMessages.UNAUTHORIZED, {});
      }


    } catch (err) {

      response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});

    }

    return h.response(response).code(response.getStatusCode());
  }

  public async verifyEmail(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    let response: Response;

    try {
      let condition: any = {
        is_deleted: 0
      };
      condition["random_key"] = request.params['id'];
      response = await this.userService.findEntry(condition);
      let result = response.getResult();
      if (result && result.length > 0) {
        const payload = { ...result[0] };
        payload.isVerified = 1;
        delete payload.id;
        response = await this.userService.updateEntry(result[0].id, payload, {});
      } else {
        response = new Response(false, StatusCodes.UNAUTHORIZED, CustomMessages.UNAUTHORIZED, {});
      }
    } catch (err) {

      response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});

    }

    return h.response(response).code(response.getStatusCode());
  }

}
