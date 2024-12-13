import { Elysia, ElysiaConfig } from "elysia";

import { DiContainer } from "#libs/di";

import { plugins } from "./plugins";
import { createRoutes } from "./routes";

export interface MockServerConfig extends ElysiaConfig<string, false> {
    port?: number;
}

export const createServer = <D extends object>({
    port = 8000,
    ...congig
}: MockServerConfig = {}, di: DiContainer<D>) => {
    const decorates = {
        di,
    };
    const app = new Elysia(congig)
        .decorate(decorates)
        .use(plugins)
        .use(createRoutes<D>(di))
        .onError(({ code, request, error, }) => {
            if(code === 'NOT_FOUND') {
                di.get('logger').error('[NOT FOUND] 😔', code, request.url);

                return {
                    code   : 404,
                    message: 'Route not found :(',
                };
            }
            di.get('logger').error('[ERROR] 😱', code, request.url);
            return new Response(error.toString());
        })
        .onRequest(({ request, }) => {
            di.get('logger').info(`[REQUEST]: ${request.method} ${request.url}`);
        })
        .listen(port);

    di.get('logger').system(`🦊 Mock server is running at http://${app.server?.hostname}:${app.server?.port}`);

    return app;
};

export type ServerApp = ReturnType<typeof createServer>;