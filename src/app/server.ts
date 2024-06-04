import { Elysia } from "elysia";

import { createDatabase } from "#libs/database";

import { setup } from "./setup";
import { routes } from "./routes";

export interface MockServerConfig {
    port?: number;
}

export const createServer = ({
    port = 3000,
}: MockServerConfig = {}) => {
    const app = new Elysia()
        .use(setup)
        .use(routes)
        .onError(({ code }) => {
            if (code === 'NOT_FOUND') {
                return 'Route not found :('
            }
        })
        .listen(port)

    console.log(
        `🦊 Mock server is running at ${app.server?.hostname}:${app.server?.port}`
    );
};

