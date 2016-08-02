'use strict';

const Confidence = require('confidence');

// Confidence criteria 
let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

//  Confidence document object

internals.config = {
    $meta: 'Paydash app configuration file',
    projectName: 'Paydash',
    port: {
        web: {
            $filter: 'env',
            test: 9000,
            production: process.env.PORT,
            $default: 8000
        }
    },
    baseUrl: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production: 'https://paydash.in',
        $default: 'http://127.0.0.1:8000'
    },
    sequelize: {
        $filter: 'env',
        production: {
            database: 'db_name',
            username: 'username',
            password: 'password',
            host: 'host.name',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        test: {
            database: 'db_name',
            username: 'username',
            password: 'password',
            host: 'host.name',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        $default: {
            database: 'db_name',
            username: 'username',
            password: 'password',
            host: 'host.name',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    yarCookie: {
        password: 'cookiepasswordhere',
        ssl: false
    },
    authCookie: {
        cookieSecret: 'cookiesecrethere',
        cookieName: 'Basic-auth'
    }
};

internals.store = new Confidence.Store(internals.config);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
