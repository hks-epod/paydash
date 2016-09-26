'use strict';

const $ = require('jquery');

exports.init = function() {
    $('a[href="' + location.pathname + '"]').addClass('active');
};


