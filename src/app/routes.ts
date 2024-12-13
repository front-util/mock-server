import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html';
import { existsSync } from 'fs';

import {DbViewer} from '#ui/db_viewer';
import {NotFound} from '#ui/not_found';
import { DiContainer } from "#libs/di";

const dbPutBodySchema = t.Object({
    key  : t.String(),
    value: t.Any(),
});
const dbGetSchema = t.Pick(dbPutBodySchema, ['key']);

const checkFileExists = (filePath: string, error: (code: number, res: string) => void) => {
    if(!existsSync(filePath)) {
        return error(404, 'File not found');
    }
    return Bun.file(filePath);
};

const createDbRoutes = <D extends object = object>(di: DiContainer<D>) => {
    return new Elysia({prefix: 'db',})
        .get('/', ({query, error,}) => {            
            if(!query.key) {
                return error(204);
            }        
            const value = di.get('db')?.get(query.key as keyof D);

            return value ?? error(204);
        }, {
            query: dbGetSchema,
        })
        .put('/', ({body,}) => {
            di.get('db')?.set(body.key as keyof D, body.value);
        }, {
            body: dbPutBodySchema,
        })
        .delete('/', ({query,}) => {
            di.get('db')?.delete(query.key as keyof D);
        }, {
            query: dbGetSchema,
        })
        .put('/push', ({body,}) => {
            di.get('db')?.push(body.key as keyof D, body.value);
        }, {
            body: dbPutBodySchema,
        })
        .put('/replace', ({body, error,}) => {
            try {
                const json = JSON.parse(body);

                di.get('db')?.replace(json);
            } catch(_) {
                return error(500);
            }
        }, {
            body: t.String(),
        })
        .get('/get', () => {
            return di.get('db').getAll();
        });
};

const createStaticRoutes = <D extends object = object>(_: DiContainer<D>) => {
    return new Elysia({prefix: 'static',})
        .get('/*', ({ params, error, }) => checkFileExists(`public/${params['*']}`, error))
        .get('/ui/*', ({ params, error, }) => checkFileExists(`src/ui/${params['*']}`, error));
};

const createUiRoutes = <D extends object = object>(_: DiContainer<D>) => {
    return new Elysia({prefix: 'ui',})
        .use(html())
        .get('/editor', ({ html: render, }) => {            
            return render(DbViewer());
        })
        .all('/*', ({ html: render, }) => {
            return render(NotFound());
        });
};

export const createRoutes = <D extends object = object>(di: DiContainer<D>) => {
    return new Elysia({name: 'routes',})
        .use(createDbRoutes<D>(di))
        .use(createStaticRoutes<D>(di))
        .use(createUiRoutes<D>(di));
};
