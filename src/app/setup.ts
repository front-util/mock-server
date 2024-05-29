
import { Elysia } from "elysia";
import { bearer } from '@elysiajs/bearer';
import { cors } from '@elysiajs/cors';
import { staticPlugin } from '@elysiajs/static'
import { logger } from "@bogeychan/elysia-logger";
import { compression } from 'elysia-compression'

const di = {
    test: 'start app'
}

const plugins = new Elysia()
    .use(bearer())
    .use(cors())
    .use(staticPlugin())
    .use(compression())
    .use(logger({
        autoLogging: true, // default
    }))

export const setup = new Elysia({ name: 'setup' })
    .use(plugins)
    .decorate({
        di
    })