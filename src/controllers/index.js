const { transformObject } = require('./../util').Transform;
const controllers = require('require-all')({
    dirname: __dirname,
    filter: /(.+controller)\.js$/
});

module.exports = transformObject(controllers);
