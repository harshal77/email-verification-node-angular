import * as nconf from "nconf";
import * as path from "path";
import { ConfigurationSettingsInterface } from '../interfaces/config-interfaces/ConfigurationSettingsInterface';


//Read Configurations
const configs = new nconf.Provider({
    env: true,
    argv: true,
    store: {
        type: 'file',
        file: path.join(__dirname, `./config.${process.env.NODE_ENV || "local"}.json`)
    }
});

// Return Database configurations

export function getConfigurations(): ConfigurationSettingsInterface {

    return configs.get("configurations");
}
