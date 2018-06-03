const { Post } = require('./../models');

exports.create = async (ctx) => {
    const post = await Post.create(ctx.request.body);
    if (post) {
        ctx.status = 200;
        ctx.body = post;
    } else {
        throw Error('Ошибка создания статьи');
    }
};

exports.update = async (ctx) => {
    const post = await Post.findOne({
        where: { id: ctx.params.id },
        attributes: ['id', 'title', 'content', 'created_at', 'updated_at']
    });
};

exports.delete = async (ctx) => {
    const result = await Post.destroy({
        where: { id: ctx.params.id }
    });

    if (result) {
        ctx.status = 200;
        ctx.body = { success: true };
    } else {
        throw Error('Не удалось удалить статью');
    }
};

exports.get = async (ctx) => {
    const post = await Post.findOne({
        where: { id: ctx.params.id },
        attributes: ['id', 'title', 'content', 'created_at', 'updated_at']
    });

    if (post) {
        ctx.status = 200;
        ctx.body = post;
    } else {
        throw Error('Статья не найдена');
    }
};

exports.list = async (ctx) => {
    const limit = 5;
    const offset = Number(ctx.params.offset) || 0;

    const data = await Post.findAndCountAll();
    const posts = await Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at', 'updated_at'],
        limit: limit,
        offset: offset,
        order: [
            ['created_at', 'desc']
        ]
    });

    if (posts) {
        ctx.status = 200;
        ctx.body = {
            count: data.count,
            posts: posts
        };
    } else {
        throw Error('Ошибка получения статей');
    }
};
