'use strict';

const Confidence = require('confidence');
const Config = require('./config');

let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

internals.manifest = {
    $meta: 'App manifest document',
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
    registrations: [

        // Context credentials
        {
            plugin: 'hapi-context-credentials'
        },
        // Cookie authentication
        {
            plugin: 'hapi-auth-cookie'
        },
        // Flash Plugin
        {
            plugin: {
                register: './lib/flash'
            }
        },
        // Hapi cookie jar
        {
            plugin: {
                register: 'yar',
                options: {
                    password: Config.get('/yarCookie/password'),
                    isSecure: Config.get('/yarCookie/ssl')
                }
            }
        },
        // Logging 
        {
            plugin: {
                register: 'good',
                options: Config.get('/good')
            }
        },
        // Crumb 
        {
            plugin: {
                register: 'crumb',
                select: ['web'],
                options: {
                    autoGenerate: true,
                    skip: function(request, reply) {
                        return true;
                    }
                }
            }
        },
        // Static file and directory handlers
        {
            plugin: 'inert'
        },

        // Templates rendering support 
        {
            plugin: 'vision'
        },
        // Views loader 
        {
            plugin: {
                register: 'visionary',
                options: {
                    engines: {
                        hbs: 'handlebars'
                    },
                    path: './app/templates',
                    layoutPath: './app/templates/layouts',
                    helpersPath: './app/templates/helpers',
                    partialsPath: './app/templates/partials',
                    layout: 'default'
                }
            }
        },
        // Sequelize
        {
            plugin: {
                register: './lib/sequelize',
                options: Config.get('/sequelize')
            }
        },
        // Auth
        {
            plugin: {
                register: './lib/auth',
                options: Config.get('/authCookie')
            }
        },
        //  Core routes
        {
            plugin: './app/routes/core.js'
        },
        //  Auth routes
        {
            plugin: './app/routes/auth.js'
        },
        //  Users routes
        {
            plugin: './app/routes/users.js'
        },
        //  Performance routes
        {
            plugin: './app/routes/performance.js'
        },
        //  Musters routes
        {
            plugin: './app/routes/musters.js'
        },
        //  Alerts routes
        {
            plugin: './app/routes/alerts.js'
        },
        //  Alerts routes
        {
            plugin: './app/routes/api.js'
        }
    ]
};

internals.store = new Confidence.Store(internals.manifest);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};
exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
