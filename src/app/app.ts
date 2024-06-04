import { createDatabase } from '#libs/database';

import {createServer, type MockServerConfig} from './server';

export interface MockAppConfig extends MockServerConfig {}

export const startApp = (config: MockAppConfig) => {
    createServer(config);
    createDatabase()
}