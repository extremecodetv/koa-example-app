const { Models } = require('./');

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
    }, {
        underscored: true,
        timestamps: true,
        tableName: 'likes',
        classMethods: {
            associate: (models) => {
                Like.belongsTo(Models.User, { foreignKey: 'user_id' });
                Like.belongsToMany(Models.Post, { foreignKey: 'like_id', as: 'Posts', through: 'likes' });
            }
        }
    });

    return Like;
};
