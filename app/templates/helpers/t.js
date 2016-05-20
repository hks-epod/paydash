'use strict';

var Confidence = require('confidence');
var locales = {
    en_US: require('../../locales/en_US/index'),
    hi: require('../../locales/hi/index')
};

module.exports = function t(path, credentials) {

    var lang = 'hi';
    var criteria = {};

    if (credentials) {
        criteria.role = credentials.role;
        lang = credentials.lang;
    }

    var store = new Confidence.Store(locales[lang]);
    return store.get(path, criteria);
};
