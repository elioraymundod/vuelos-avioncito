const w = require('winston');

const logger = w.createLogger({
    transports: [
        new w.transports.Console({
            format: w.format.combine(
                w.format.timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss'
                }),
                w.format.colorize(),
                w.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
            )
        }),
        new w.transports.File({
            filename: 'logs/log.log',
            format: w.format.combine(
                w.format.timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss'
                }),
                w.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
            )
        })
    ]
});

module.exports = logger;