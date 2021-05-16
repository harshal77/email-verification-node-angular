import * as Hapi from '@hapi/hapi';
import { ServerConfigurationInterface } from './interfaces/config-interfaces/ServerConfigurationInterface';
import UsersRoutes from './routes/UsersRoutes';

export async function init(
    serverConfig: ServerConfigurationInterface,
): Promise<Hapi.Server> {

    try {
        const port = serverConfig.port;
        const server = new Hapi.Server({
            host: "0.0.0.0",
            port: port,
            router: {
                stripTrailingSlash: true,
            },
            routes: {
                cors: {
                    origin: ['*'],
                    credentials: true
                }
            },
            state: {
                strictHeader: false
            }
        });


        if (serverConfig.routePrefix) {
            server.realm.modifiers.route.prefix = serverConfig.routePrefix;
        }

        // Plugin Registration
        await server.register([
            require('@hapi/inert'),
            require('@hapi/vision')
        ])

        // Routes Registration
        UsersRoutes(server);
        console.log('Routes registered sucessfully.');

        return server;
    } catch (err) {

        console.log('Error starting server: ', err);
        throw err;
    }
}
