'use strict';
var $ = require('jquery');
var d3 = require('d3');

$('a[href="' + location.pathname + '"]').addClass('active');

// MENU
d3.selectAll('#top-ham').on('click', function() {
    d3.selectAll('#top-ham').classed('active', function(d, i) {
        return !d3.select(this).classed('active');
    });
    d3.selectAll('.menu-wrapper').classed('active', function(d, i) {
        return !d3.select(this).classed('active');
    });
});
