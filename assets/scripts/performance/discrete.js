'use strict';

var D3 = require('d3');
var Cookie = require('../lib/cookie');


// Load JSON
exports.init = function() {
    D3.json('/performance/overview/data?region_id=' + Cookie.read('region_id'))
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {
            internals.data = data;
            // d3.select('#block_name').text(paydash.data.block_name);
            // drawBlockPerformance();
            // drawBlockComparison(1);
        });
};
