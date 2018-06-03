const StackTraceParser = require('stacktrace-parser');
const winston = require('winston');
const path = require('path');
const fs = require('fs');

winston.emitErrs = true;

const dirLog = path.join(process.cwd(), './logs');
const exFilePath = path.join(dirLog, 'error.log');
const appFilePath = path.join(dirLog, 'app.log');
const logMaxSize = 5242880; // 5mb

const getLabel = (filename) => filename.split(path.sep).slice(-2).join(path.sep);

const getModuleFilePath = (fileinfo) => getLabel(fileinfo.filename);

const getName = (ex) => {
    return ex instanceof Error
        ? getLabel(StackTraceParser.parse(ex.stack).shift().file)
        : getModuleFilePath(ex);
};

if (!fs.existsSync(dirLog)) {
    fs.mkdirSync(dirLog);
}

const logger = (ex) => {
    const label = getName(ex);

    return new (winston.Logger)({
        transports: [
            new winston.transports.File({
                name: 'file.error',
                level: 'error',
                label: label,
                filename: exFilePath,
                handleExceptions: true,
                humanReadableUnhandledException: true,
                json: false,
                maxSize: logMaxSize,
                colorize: false
            }),
            new winston.transports.File({
                name: 'file.info',
                level: 'info',
                label: label,
                filename: appFilePath,
                handleExceptions: false,
                json: false,
                maxSize: logMaxSize,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                label: label,
                handleExceptions: true,
                humanReadableUnhandledException: true,
                json: false,
                colorize: true,
                timestamp: true
            })
        ],
        exitOnError: false
    });
};

module.exports = logger;
