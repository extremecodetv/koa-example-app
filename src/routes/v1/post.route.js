const Router = require('koa-router');
const { Post } = require('./../../controllers');

const router = Router({
    prefix: '/post'
});

router.post('/', Post.create);

router.get('/:id', Post.get);

router.put('/:id', Post.update);

router.delete('/:id', Post.delete);

router.get('/list/:offset', Post.list);

module.exports = router;
