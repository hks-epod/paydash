'use strict';

var D3 = require('d3');
var Chart = require('./chart');

exports.discrete = function(data) {
    D3.select('.region_charts-container').selectAll('div').remove();
    D3.select('#region_charts-container')
        .append('div')
        .classed(' pure-g', true)
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .classed(' pure-u pure-u-8-24', true)
        .html(function(d, index) {
            return '<div class="chart-holder small_chart">' +
                '<div id="d_' + d.region_code + '"></div>' +
                '<div class="d_' + d.region_code + '_legend"></div>' +
                '</div>';
        });
};
