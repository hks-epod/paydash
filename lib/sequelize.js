'use strict';

var Sequelize = require('sequelize');
var glob = require('glob');

exports.register = function(plugin, options, next) {
    var db = {};
    var sequelize = new Sequelize(options.database, options.username, options.password, {
        host: options.host,
        dialect: options.dialect,
        pool: options.pool
    });

    var models = glob.sync('app/models/*.js');
    models.forEach(function(file) {
        var model = sequelize['import']('../' + file);
        db[model.name] = model;
    });

    // Object.keys(db).forEach(function(modelName) {
    //     if ('associate' in db[modelName]) {
    //         db[modelName].associate(db);
    //     }
    // });

    sequelize.sync().then(function() {
        console.log('Database connected');
    });

    // Expose sequelize
    db.sequelize = sequelize;
    plugin.expose('db', db);

    next();
};


exports.register.attributes = {
    name: 'sequelize',
    version: require('../package.json').version
};
