import { Elysia } from "elysia";

new Elysia()
    .group('/v1', (app) =>
        app.guard(
            (app) => app.post('/student', ({ body }) => body)
        )
    );