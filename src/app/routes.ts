import { Elysia } from "elysia";
import { html } from '@elysiajs/html'

import {Test, test2} from '#ui/test/Test'

export const routes = new Elysia({name: 'routes'})
    .group(
        '/api', 
        (app) => app
            .get('/student', ({ query }) => query)
    )
    .use(html())
    .group(
        '/ui', 
        (app) => app
            .get('/test', ({ query, html }) => html(Test.render(query)))
            .get('/test2', test2)
    );