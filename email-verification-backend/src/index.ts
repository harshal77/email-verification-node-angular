
import { UserModel } from './models/UserModel';
import { UserInterfce } from './interfaces/db-interfaces/UserInterface';
import * as Server from "./server";
import * as Configs from "./configurations";
import * as Mongoose from "mongoose";

import { MongoConfigurationInterface } from "./interfaces/config-interfaces/MongoConfigurationInterface";
import { ConfigurationSettingsInterface } from "./interfaces/config-interfaces/ConfigurationSettingsInterface";


console.log(`Running enviroment ${process.env.NODE_ENV || 'development'}`);

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
    console.error(`uncaughtException ${error}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

const allConfigurations: ConfigurationSettingsInterface = Configs.getConfigurations();

// Db Connections 

export interface DatabaseModelsInterface {
    UserModel: Mongoose.Model<UserInterfce>;
}

function initMongoDb(config: MongoConfigurationInterface): DatabaseModelsInterface {

    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(config.connectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });


    Mongoose.set('debug', function (coll, method, query, doc) { });
    Mongoose.set('useCreateIndex', true);


    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {
        UserModel: UserModel
    };
}

// console.log("All Configuration", allConfigurations);

// Define async start function
const start = async ({ config }) => {
    try {

        const server = await Server.init(config);
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.error('Error starting server: ', err.message);
        throw err;
    }
};


global['mongo'] = initMongoDb(allConfigurations.mongoConfig);
global['host'] = allConfigurations.myHost;


const serverConfigs = allConfigurations.serverConfig;

// Start the server
start({
    config: serverConfigs,
});
