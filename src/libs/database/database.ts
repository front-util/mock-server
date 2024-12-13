import { JSONFilePreset } from 'lowdb/node';
import {Low} from 'lowdb';
import { CreateDatabaseConfig, DbAdapter, MockDb } from './types';

const DEFAULT_DB_PATH = './public/database/database.json';

const createDbAdapter = <D extends object>(db: Low<MockDb<D>>): DbAdapter<D> => {
    return {
        get: (key) => {
            return db.data[key];
        },
        getAll: () => {
            return db.data;
        },
        set: async (key, value) => {
            await db.update((data) => data[key] = value);
        },
        delete: async (key) => {
            await db.update((data) => delete data[key]);
        },
        push: async (key, value) => {
            await db.update((data) => {
                if(Array.isArray(data[key])) {
                    data[key].push(value);
                }
            });
        },
        replace: async (data) => {
            db.data = data as MockDb<D>;
            await db.write(); },
    } as DbAdapter<D>;
};

export const createDatabase = async <D extends object>({
    pathToDb = DEFAULT_DB_PATH,
}: CreateDatabaseConfig) => {
    const defaultData = {
        config: {},
    } as MockDb<D>;
    
    const db = await JSONFilePreset<MockDb<D>>(pathToDb, defaultData);

    return createDbAdapter<D>(db);
};