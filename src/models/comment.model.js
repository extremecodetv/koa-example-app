const { Models } = require('./');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 140]
            }
        }
    }, {
        underscored: true,
        tableName: 'comments',
        classMethods: {
            associate: (models) => {
                Comment.belongsTo(Models.User, { foreignKey: 'user_id', as: 'User' });
                Comment.belongsTo(Models.Post, { foreignKey: 'post_id' });
                Comment.belongsToMany(Models.Like, { foreignKey: 'comment_id', as: 'Like' });
            }
        }
    });


    return Comment;
};
