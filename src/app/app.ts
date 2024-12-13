import { createDatabase, type CreateDatabaseConfig } from '#libs/database';
import { createDi } from '#libs/di';
import { logger } from '#libs/logger';

import {
    createServer, 
    type MockServerConfig
} from './server';

export type MockAppConfig = MockServerConfig & CreateDatabaseConfig;

export const startApp = async <D extends object>({
    pathToDb,
    ...config
}: MockAppConfig | undefined = {}) => {
    const di = createDi<D>();
    const db = await createDatabase<D>({
        pathToDb,
    });
    
    di.register('db', db);
    di.register('logger', logger);

    return createServer(config, di);
};
