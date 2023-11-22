import winston from 'winston';

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        logFormat
    ),
});

const logger = winston.createLogger({
    levels: logLevels,
    format: logFormat,
    transports: [consoleTransport],
});

winston.addColors(logColors);

export default logger;
