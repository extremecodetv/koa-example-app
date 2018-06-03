const { Post } = require('./../models');

exports.like = async (ctx) => {
    const { id } = ctx.params;
    const post = await Post.find({
        where: { id: id }
    });
    console.log();
};

exports.unlike = async (ctx) => {

};
