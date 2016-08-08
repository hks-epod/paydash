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
        production: 'https://example.jolly.com',
        $default: 'http://127.0.0.1:8000'
    },
    sequelize: {
        $filter: 'env',
        production: {
            database: 'nrega_payments',
            username: 'paydash',
            password: 'ep()danalytics1235',
            host: 'epodindia.cvthz0qudx9w.ap-southeast-1.rds.amazonaws.com',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        test: {
            database: 'paydash',
            username: 'paydash',
            password: 'paydash',
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
        password: '^*&^(&*#RJHD*)(*_()#*JHSC*&(*#&HKJSHJWIE)_(_))(&^%GHJGKJHKJH',
        ssl: false
    },
    authCookie: {
        cookieSecret: '&&(*&)(DFLKDJFLU)(*(HJKLHUIY*&#^*(&)(JD{PEI_)(*&^(HGKHJHIUY&)(*)(HGD$#%$#GFIOUOU',
        cookieName: 'Basic-auth'
    }
};

var store = new Confidence.Store(config);

exports.get = function(key) {
    return store.get(key, criteria);
};