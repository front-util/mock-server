import { Elysia } from "elysia";
import { bearer } from '@elysiajs/bearer';
import { cors } from '@elysiajs/cors';
import { compression } from "@chneau/elysia-compression";

export const plugins = new Elysia()
    .use(bearer())
    .use(cors())
    .use(compression());