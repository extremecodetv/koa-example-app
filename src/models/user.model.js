const { Models } = require('./');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            },
            set(value) {
                this.setDataValue('email', value.toLowerCase());
            }
        },
        passwordHash: {
            type: DataTypes.STRING,
            field: 'password_hash',
            validate: {
                notEmpty: true,
                len: [8, 128]
            }
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 128]
            }
        }
    }, {
        underscored: true,
        timestamps: true,
        tableName: 'users',
        classMethods: {
            associate: (models) => {
                User.hasMany(Models.Post, { foreignKey: 'user_id' });
                User.hasMany(Models.Like, { foreignKey: 'user_id' });
                User.hasMany(Models.Comment, { foreignKey: 'user_id' });
            }
        }
    });

    User.prototype.authenticate = async function authenticate(value) {
        const match = await bcrypt.compare(value, this.passwordHash);

        return match ? this : false;
    };

    const securePasssword = async (user) => {
        if (user.password) {
            const rounds = 10;
            const hash = await bcrypt.hash(user.password, rounds);
            user.passwordHash = hash;
        }
    };

    User.beforeCreate(securePasssword);
    User.beforeUpdate(securePasssword);

    return User;
};
