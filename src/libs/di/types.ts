import { DbAdapter } from "#libs/database";
import { type Logger } from "#libs/logger";

export interface DiServices<D extends object> {
    db: DbAdapter<D>;
    logger: Logger;
}

export interface DiContainer<D extends object = object> {
    get<K extends keyof DiServices<D>>(key: K): DiServices<D>[K];
    register<K extends keyof DiServices<D>>(key: K, value: DiServices<D>[K]): void;
    remove(key: keyof DiServices<D>): boolean;
}