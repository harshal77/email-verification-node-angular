import { ServerConfigurationInterface } from "./ServerConfigurationInterface";
import { MongoConfigurationInterface } from "./MongoConfigurationInterface";

export interface ConfigurationSettingsInterface {

    serverConfig: ServerConfigurationInterface,
    mongoConfig: MongoConfigurationInterface,
    myHost: string;
    senderMail: any;
}
