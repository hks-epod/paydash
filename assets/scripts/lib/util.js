'use strict';

var D3 = require('d3');

//  Parse the "20140412" string to date object
function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6);
    var d = string.substring(6, 8);
    return new Date(y, m, d);
}

exports.indexBykey = function(arr, key, value) {
    var ind;
    arr.forEach(function(entity, index) {
        if (entity[key] === value) {
            ind = index;
        }
    });
    return ind;
};

exports.overviewLimits = function(internals) {
    if (internals.past_n_days !== '') {
        var past_n_date = new Date();
        past_n_date.setDate(past_n_date.getDate() - internals.past_n_days);
    }
    var limit = {
        max_x: new Date(),
        min_x: past_n_date || null
    };
    return limit;
};


exports.discreteLimits = function(internals) {

    var limit = {
        max_y: 10,
        max_x: new Date(),
        min_x: new Date()
    };

    if (internals.past_n_days !== '') {
        var past_n_date = new Date();
        past_n_date.setDate(past_n_date.getDate() - internals.past_n_days);
        limit.min_x = past_n_date;
    }

    internals.data.discrete.forEach(function(region, index) {
        region.data.forEach(function(arr) {

            if (internals.past_n_days === '') {
                if (parseDate(arr[0]) > limit.max_x) {
                    limit.max_x = parseDate(arr[0]);
                }
                if (parseDate(arr[0]) < limit.min_x) {
                    limit.min_x = parseDate(arr[0]);
                }
            }

            internals.stepCols.forEach(function(val) {
                if (!past_n_date || parseDate(arr[0]) >= past_n_date) {
                    //  calculate max y 
                    if (arr[val] > limit.max_y) {
                        limit.max_y = arr[val];
                    }
                }
            });
        });
    });
    return limit;
};

exports.loadMappingMessage = function(mapping) {
    if (mapping.grs_panchayat_count < mapping.total_panchayat_count) {
        D3.select('#mapping-msg-1').classed('u-hidden', false);
    }
    if (mapping.grs_panchayat_count < mapping.total_panchayat_count) {
        D3.select('#mapping-msg-2').classed('u-hidden', false);
    }
};

exports.loadMappingMessageGrouping = function(mapping, grouping) {
    D3.select('#mapping-msg-1').classed('u-hidden', true);
    D3.select('#mapping-msg-2').classed('u-hidden', true);
    if (mapping.ta_panchayat_count < mapping.total_panchayat_count && grouping === 'GRS') {
        D3.select('#mapping-msg-1').classed('u-hidden', false);
    }
    if (mapping.grs_panchayat_count < mapping.total_panchayat_count && grouping === 'TA') {
        D3.select('#mapping-msg-2').classed('u-hidden', false);
    }
    
};
