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
    $meta: 'paydash app example configuration file',
    projectName: 'paydash',
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
            username: 'db_user',
            password: 'db_pass',
            host: 'db_host',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        test: {
            database: 'db_name',
            username: 'db_user',
            password: 'db_pass',
            host: 'db_host',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        $default: {
            database: 'db_name',
            username: 'db_user',
            password: 'db_pass',
            host: 'db_host',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    yarCookie: {
        password: '32_char_pass',
        ssl: false
    },
    authCookie: {
        cookieSecret: '32_char_pass',
        cookieName: 'Basic-auth'
    },
    mailer: {
        sendgrid: {
            auth: {
                api_key: 'sendgrod_api_key'
            }
        }
    },
    freshdesk: {
        key: 'api_key'
    }
};

internals.store = new Confidence.Store(internals.config);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
