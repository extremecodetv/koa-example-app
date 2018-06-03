require('dotenv').config();

module.exports = {
    development: {
        dialect: 'mysql',
        url: process.env.DB_URI
    }
};
