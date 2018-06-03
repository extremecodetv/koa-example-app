const Router = require('koa-router');
const route = require('./v1');

const router = Router({
    prefix: '/api'
});

router.use(route.routes(), route.allowedMethods());

module.exports = router;
