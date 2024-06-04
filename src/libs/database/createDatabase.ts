import { JSONFilePreset } from 'lowdb/node';
import { Low, JSONFile } from 'lowdb'
import lodash from 'lodash'

export interface MockDatabaseConfig {
    pathToDb?: string;
}

class LowWithLodash<T> extends Low<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

export class MockDatabase<T> {
    #db: LowWithLodash<T>;

    private constructor() {}

    init({
        pathToDb = '#public/database/database.json'
    }: MockDatabaseConfig) {
        this.#createDatabase(pathToDb)
    }

    #createDatabase = async (pathToDb: string) => {
        const adapter = new JSONFile<T>(pathToDb, {} as T)

        this.#db = new LowWithLodash(adapter, {} as T)
    }

    
}