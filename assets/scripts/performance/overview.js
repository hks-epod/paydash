'use strict';

var D3 = require('d3');
var Cookie = require('../lib/cookie');


// Load JSON
exports.init = function() {
    var internals = {};

    D3.json('/performance/overview/data?region_code=' + Cookie.read('active_region'))
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {
            D3.select('#loading').remove();
            D3.select('#dashboard').classed('u-hidden', false);
            internals.data = data;
            D3.select('#region_name').text(data.region_name);
            // drawBlockPerformance();
            // drawBlockComparison(1);
        });
};
