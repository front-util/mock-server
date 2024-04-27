
import { Elysia } from "elysia";

const di = {
    test: 'start app'
}

export const setup = new Elysia({ name: 'setup' })
    .decorate({
        di
    })