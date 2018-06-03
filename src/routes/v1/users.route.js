const Router = require('koa-router');

const router = Router({
    prefix: '/users'
});

router.get('/', (ctx, next) => { throw Error('Hey'); });

module.exports = router;
