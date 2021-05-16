"use strict";
import { Response } from '../classes/Response'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { StatusCodes } from '../classes/StatusCodes';
import { CustomMessages } from '../classes/CustomMessages';


export default class CommonCrudServiceImpl {
    async
    private dbModel;
    private notReturningKeysInCollection = {
        created_at: 0,
        updated_at: 0,
        v: 0,
        password: 0,
        is_deleted: 0,
        last_otp: 0,
        is_verified: 0,
        random_key: 0
    }


    constructor(dbModel: any) {
        this.dbModel = dbModel;
    }

    public async camalizeKeysForMongoArray(array) {

        return array.map(function (question) {

            let a = question.toJSON();

            let id = a['_id'];

            let b = camelizeKeys(a);

            b['id'] = id;

            return b;

        });

    }


    public async findEntry(condition) {

        let response: Response;

        try {

            let resourceEntry = await this.dbModel.find(decamelizeKeys(condition));

            if (resourceEntry && resourceEntry.length > 0) {

                resourceEntry = await this.camalizeKeysForMongoArray(resourceEntry);
                response = new Response(true, StatusCodes.OK, CustomMessages.SUCCESS, resourceEntry);

            } else {

                response = new Response(true, StatusCodes.OK, CustomMessages.SUCCESS, resourceEntry);

            }


        } catch (err) {

            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
        }

        return response;
    }

    public async createOrFindEntry(payload, condition) {

        let response: Response;

        try {

            let entry = await this.dbModel.find(condition);

            if (entry.length === 0) {

                let cretaedEntry = await this.dbModel.create(decamelizeKeys(payload));
                let resourceEntry = await this.dbModel.find(condition);

                resourceEntry = await this.camalizeKeysForMongoArray(resourceEntry);
                response = new Response(true, StatusCodes.CREATED, CustomMessages.CREATED, resourceEntry);

            } else {
                response = new Response(false, StatusCodes.NOT_ACCEPTABLE, CustomMessages.ALREADY_PRESENT, {});
            }

        } catch (err) {

            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
        }

        return response;
    }

    public async updateEntry(id: string, payload: any, logObj): Promise<Response> {

        let response: Response;
        try {
            let condition = {};
            condition['_id'] = id;
            let isEntryPresent = await this.dbModel.find((condition));
            if (isEntryPresent.length !== 0) {

                if (isEntryPresent[0].logs !== undefined && Object.keys(logObj).length != 0) {

                    let logs = isEntryPresent[0].logs;
                    if (logObj.email) {
                        logs.push(logObj);
                    }
                    payload['logs'] = logs;
                } else {
                    if (logObj.email) {
                        payload['logs'] = [];
                        payload['logs'].push(logObj);
                    }

                }

                let a = await this.dbModel.updateOne(condition, decamelizeKeys(payload));

                let updatedEntry = await this.dbModel.find(condition, this.notReturningKeysInCollection);
                updatedEntry = await this.camalizeKeysForMongoArray(updatedEntry);
                response = new Response(true, StatusCodes.OK, CustomMessages.UPDATED, updatedEntry);

            } else {

                response = new Response(false, StatusCodes.BAD_REQUEST, CustomMessages.NOT_PRESENT, {});

            }
        } catch (err) {
            console.log('error', err);
            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
        }

        return response;
    }

}
