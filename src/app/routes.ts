import { Elysia } from "elysia";
import { html } from '@elysiajs/html'

import {testHTML} from '#ui/testhtml/Test'

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
            .get('/test', ({ query, html }) => html(testHTML(query?.id ? +query.id : 0)))
    );