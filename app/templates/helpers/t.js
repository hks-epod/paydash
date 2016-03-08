'use strict';

var Confidence = require('confidence');
var locales = {
    en_US: require('../../locales/en_US/index')
};

module.exports = function t(path, credentials) {

    var lang = 'en_US';
    var criteria = {};

    if (credentials) {
        criteria.role = credentials.role;
    }

    var store = new Confidence.Store(locales[lang]);
    return store.get(path, criteria);
};
