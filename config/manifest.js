'use strict';

var Confidence = require('confidence');
var Config = require('./config');

var criteria = {
    env: process.env.NODE_ENV
};

var manifest = {
    $meta: 'paydash app manifest document',
    server: {
        connections: {
            router: {
                stripTrailingSlash: true,
                isCaseSensitive: false
            },
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/web'),
        labels: ['web']
    }, {
        port: Config.get('/port/api'),
        labels: ['api']
    }],
    plugins: {
        'hapi-context-credentials': {},
        'hapi-auth-cookie': {},
        './lib/flash': {},
        'yar': {
            cookieOptions: {
                password: Config.get('/yarCookie/password'),
                isSecure: Config.get('/yarCookie/ssl')
            }
        },
        'good': Config.get('/good'),
        'crumb': [{
            select: ['web'],
            options: { autoGenerate: true, }
        }],
        'inert': {},
        'vision': {},
        'visionary': {
            engines: {
                hbs: 'handlebars'
            },
            path: './app/templates',
            layoutPath: './app/templates/layouts',
            helpersPath: './app/templates/helpers',
            partialsPath: './app/templates/partials',
            layout: 'default'
        },
        './lib/sequelize': Config.get('/sequelize'),
        './lib/auth': Config.get('/authCookie'),
        './app/routes/core': [{
            select: ['web']
        }],
        './app/routes/auth': [{
            select: ['web']
        }],
        './app/routes/users': [{
            select: ['web']
        }],
        './app/routes/performance': [{
            select: ['web']
        }],
        './app/routes/musters': [{
            select: ['web']
        }],
        './app/routes/alerts': [{
            select: ['web']
        }],
        './app/routes/api': {
            select: ['api']
        }
    }
};

var store = new Confidence.Store(manifest);

exports.get = function(key) {
    return store.get(key, criteria);
};
exports.meta = function(key) {
    return store.meta(key, criteria);
};
