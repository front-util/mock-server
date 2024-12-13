export interface CreateDatabaseConfig {
    pathToDb?: string;
}

export type MockDb<D extends object> = D & {
    config: string;
}

export interface DbAdapter<D extends object> {
    get<T extends keyof MockDb<D> = keyof MockDb<D>>(key: T): MockDb<D>[T];
    getAll(): MockDb<D>;
    set<T extends keyof MockDb<D> = keyof MockDb<D>>(key: T, value: MockDb<D>[T]): Promise<void>;
    delete<T extends keyof MockDb<D> = keyof MockDb<D>>(key: T): Promise<void>;
    push<T extends keyof MockDb<D> = keyof MockDb<D>>(key: T, value: MockDb<D>[T]): Promise<void>;
    replace(data: Record<string, unknown>): Promise<void>;
}