import { 
    type DiContainer, 
    type DiServices 
} from "./types";

export const createDi = <D extends object>(): DiContainer<D> => {
    type TypedDiService = DiServices<D>;
    const di = new Map<keyof TypedDiService, TypedDiService[keyof TypedDiService]>();

    return {
        get     : (key) => di.get(key),
        register: (key, value) => di.set(key, value),
        remove  : (key) => di.delete(key),
    } as DiContainer<D>;
};