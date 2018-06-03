const logger = require('./../util/logger');

const handle = (err) => (ctx) => {
    const log = logger(err);
    log.error(err);

    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
};

const catchError = async (ctx, next) => {
    try {
        if (ctx && next) {
            await next();
        }
    } catch (err) {
        handle(err)(ctx);
    }
};

module.exports = catchError;
