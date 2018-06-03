const Sequelize = require('sequelize');
const { transformArray } = require('./../util').Transform;
const { db } = require('./../config');

const fs = require('fs');
const path = require('path');

const models = { };

const sequelize = new Sequelize(db.uri, {
    logging: false,
    dialect: 'mysql'
});

const getTransformedModels = () => { // fck ths sht
    const basename = path.basename(__filename);
    const files = fs.readdirSync(__dirname).filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    });

    const names = transformArray(files);
    const result = [];
    for (let i = 0; i < names.length; i += 1) {
        result.push({
            name: names[i],
            file: files[i]
        });
    }

    return result;
};

const importModel = (raw) => {
    models[raw.name] = sequelize.import(path.join(__dirname, raw.file));
};

getTransformedModels().forEach(m => {
    importModel(m);
});

Object.keys(models).forEach(name => {
    if (models[name].associate) {
        models[name].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = Object.freeze(models);
