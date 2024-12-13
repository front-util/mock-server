export interface Logger {
    info: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    system: (...args: unknown[]) => void;
}