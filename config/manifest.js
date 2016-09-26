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
                    storeBlank: false,
                    cookieOptions: {
                        password: Config.get('/yarCookie/password'),
                        isSecure: Config.get('/yarCookie/ssl')
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

        // Versioning
        {
            plugin: {
                register: './lib/versioning',
                options: {
                    validVersions: [1, 2],
                    defaultVersion: 1,
                    vendorName: 'paydroid',
                    basePath: '/api/'
                }
            }
        },

        //  Mailer
        {
            plugin: {
                register: './lib/mailer',
                options: Config.get('/mailer')
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

        //  Overview routes
        {
            plugin: './app/routes/overview.js'
        },

        //  Performance routes
        {
            plugin: './app/routes/performance.js'
        },

        //  Musters routes
        {
            plugin: './app/routes/musters.js'
        },
        //  Contact routes
        {
            plugin: './app/routes/contact.js'
        },
        //  Api routes
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
