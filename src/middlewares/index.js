const compose = require('koa-compose');
const convert = require('koa-convert');

const methodOverride = require('koa-methodoverride');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const helmet = require('koa-helmet');
const json = require('koa-json');
const cors = require('koa-cors');
const handleError = require('./error');

module.exports = compose([
    helmet(),
    bodyParser(),
    convert(cors()),
    convert(json()),
    convert(methodOverride()),
    convert(handleError)
]);
