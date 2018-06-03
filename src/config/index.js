
module.exports = Object.freeze({
    server: require('./server'),
    sequelize: require('./database'),
    db: {
        uri: process.env.DB_URI
    }
});
