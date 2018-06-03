const { Models } = require('./');

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 140]
            }
        },
        content: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true,
        timestamps: true,
        tableName: 'posts',
        classMethods: {
            associate: (models) => {
                Post.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });
                Post.belongsToMany(Models.Like, { foreignKey: 'post_id', as: 'likes', through: 'likes_posts' });
                Post.hasMany(Models.Comment, { foreignKey: 'post_id', as: 'comments' });
            }
        }
    });

    return Post;
};
