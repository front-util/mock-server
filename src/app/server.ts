import { Elysia } from "elysia";

import { setup } from "./setup";
import { TestJSX } from "./test_jsx";

export const createServer = ({
    port = 3000
} = {}) => {
    const app = new Elysia()
        .use(setup)
        .get("/", 
            (ctx) => {
                ctx.log.info(ctx.path);
                return 'success'
            },
            {
                detail: {
                  tags: ['App']
                }
              }
        )
        .get('/jsx', TestJSX)
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

