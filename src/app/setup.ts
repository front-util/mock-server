
import { Elysia } from "elysia";
import { bearer } from '@elysiajs/bearer';
import { cors } from '@elysiajs/cors';
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'
// import { logger } from "@bogeychan/elysia-logger";
import { compression } from 'elysia-compression'

const di = {
    test: 'start app'
}

const plugins = new Elysia()
    .use(bearer())
    .use(cors())
    .use(html())
    .use(staticPlugin())
    .use(swagger({
        documentation: {
            info: {
                title: 'Elysia Documentation',
                version: '1.0.0'
            }
        }
    }))
    .use(compression())
    // .use(logger({
    //     autoLogging: true, // default
    // }))

export const setup = new Elysia({ name: 'setup' })
    .use(plugins)
    .decorate({
        di
    })