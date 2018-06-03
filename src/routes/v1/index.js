const Router = require('koa-router');
const routes = require('require-all')({
    dirname: __dirname,
    filter: /(.+route)\.js$/
});

const router = Router({
    prefix: '/v1'
});

Object.keys(routes).forEach(name => {
    const route = routes[name];
    router.use(route.routes(), route.allowedMethods());
});

module.exports = router;
