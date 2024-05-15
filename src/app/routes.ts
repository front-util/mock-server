import { Elysia } from "elysia";

import {Test} from '#ui/test/Test'

export const routes = new Elysia({name: 'routes'})
    .group(
        '/api', 
        (app) => app.get('/student', ({ query }) => query)
    )
    .group(
        '/ui', 
        (app) => app.get('/test', ({ query }) => Test.render(query))
    );