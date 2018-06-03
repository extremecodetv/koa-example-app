const Router = require('koa-router');
const { Like } = require('./../../controllers');

const router = Router({
    prefix: '/rating'
});

router.get('/:id', Like.like);

router.delete('/:id', Like.unlike);

module.exports = router;
