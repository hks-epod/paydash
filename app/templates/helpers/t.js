'use strict';

var Confidence = require('confidence');
var locales = {
    en_US: {
        v1: require('../../locales/en_US/v1'),
        v2: require('../../locales/en_US/v2')
    },
    hi: {
        v1: require('../../locales/hi/v1'),
        v2: require('../../locales/hi/v2')
    }
};

module.exports = function t(path, credentials, version) {

    var lang = 'hi';
    var criteria = {};
    var ver;

    if (version) {
        ver = version;
    } else {
        ver = 'v1';
    }

    if (credentials) {
        criteria.role = credentials.role;
        lang = credentials.lang;
    }

    var store = new Confidence.Store(locales[lang][ver]);
    return store.get(path, criteria);
};
