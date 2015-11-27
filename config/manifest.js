'use strict';

var Confidence = require('confidence');
var Config = require('./config');

var criteria = {
    env: process.env.NODE_ENV
};

var manifest = {
    $meta: 'paydash app manifest document.',
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
        crumb: {
            autoGenerate: true
        },
        inert: {},
        vision: {},
        visionary: {
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
        './app/routes/core': {},
        './app/routes/auth': {},
        './app/routes/users': {},
        './app/routes/dashboard': {},
        './app/routes/musters': {},
        './app/routes/alerts': {}
    }
};

var store = new Confidence.Store(manifest);

exports.get = function(key) {
    return store.get(key, criteria);
};
