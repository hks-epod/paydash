'use strict';

var Sequelize = require('sequelize');
var glob = require('glob');

exports.register = function(plugin, options, next) {

    var sequelize = new Sequelize(options.database, options.username, options.password, {
        host: options.host,
        dialect: options.dialect,
        pool: options.pool
    });

    var models = glob.sync('app/models/*.js');
    models.forEach(function(model) {
        sequelize.import('../' + model);
    });

    sequelize.sync().then(function() {
        console.log('Database connected');
    });

    // Expose sequelize
    plugin.expose('sequelize', sequelize);

    next();
};


exports.register.attributes = {
    name: 'sequelize',
    version: require('../package.json').version
};
