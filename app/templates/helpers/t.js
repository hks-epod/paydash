'use strict';

var Confidence = require('confidence');
var locales = {
    en_US: require('../../locales/en_US/index')
};

module.exports = function t(path) {
    // US English is currently the only support langauge.
    // Refactor this when we start supporting more languages.
    var lang = 'en_US';
    var criteria = {
        role: 'district'
    };
    var store = new Confidence.Store(locales[lang]);
    return store.get(path, criteria);
};
