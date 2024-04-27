import { Elysia } from "elysia";

import { setup } from "./setup";

export const createServer = ({
    port = 3000
} = {}) => {
    const app = new Elysia()
        .use(setup)
        .get("/", ({di}) => di.test)
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

