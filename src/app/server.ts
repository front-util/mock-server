import { Elysia } from "elysia";

import { setup } from "./setup";
import { routes } from "./routes";

export const createServer = ({
    port = 3000
} = {}) => {
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
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
};

