import { Logger } from "./types";

const getParams = () => {
    const { format, } = new Intl.DateTimeFormat('ru-RU', {
        timeStyle: 'medium',
        dateStyle: 'short',
    });

    return `${format(new Date())}`;
};

export const logger: Logger = {
    info : (...args) => console.log('\x1b[7m', `[info: ${getParams()}] `, ...args),
    error: (...args) => {
        console.log('\x1b[31m', '------!!!!!!------');
        console.log('\x1b[31m', `[error: ${getParams()}] `, ...args);
        console.log('\x1b[31m', '------!!!!!!------');
    },
    warn  : (...args) => console.log('\x1b[33m', `[warn: ${getParams()}] `, ...args),
    system: (...args) => console.log('\x1b[36m', `[system: ${getParams()}] `, ...args),
};