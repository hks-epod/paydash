'use strict';
var Confidence = require('confidence');

// Confidence criteria 
var criteria = {
    env: process.env.NODE_ENV
};

//  Confidence document object
var config = {
    $meta: 'paydash app configuration file',
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
        production: 'https://example.yourdomain.com',
        $default: 'http://127.0.0.1:8000'
    },
    sequelize: {
        $filter: 'env',
        production: {
            database: 'db_name',
            username: 'username',
            password: 'password',
            host: 'db_host_address',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        test: {
            database: 'paydash',
            username: 'username',
            password: 'password',
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        $default: {
            database: 'paydash',
            username: 'root',
            password: '',
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    yarCookie: {
        password: 'your_cookie_secret',
        ssl: false
    },
    authCookie: {
        cookieSecret: 'your_auth_cookie_secret',
        cookieName: 'Basic-auth'
    },
    good: {
        opsInterval: 1000,
        reporters: [{
            reporter: 'good-file',
            events: {
                ops: '*'
            },
            config: {
                path: 'logs/ops/',
                rotate: 'daily',
                prefix: 'payops'
            }
        }, {
            reporter: 'good-file',
            events: {
                error: '*'
            },
            config: 'logs/error.json'
        }]
    }
};

var store = new Confidence.Store(config);

exports.get = function(key) {
    return store.get(key, criteria);
};
