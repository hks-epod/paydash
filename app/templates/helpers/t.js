'use strict';
var Hoek = require('hoek');

var locales = {
    en_US: require('../../locales/en_US/index')
};

module.exports = function t(path) {
    // US English is currently the only support langauge.
    // Refactor this when we start supporting more languages.
    var lang = 'en_US';

    return Hoek.reach(locales[lang], path);
};
