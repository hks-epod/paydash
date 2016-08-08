'use strict';

const D3 = require('D3');

exports.parser = function(rows) {

    var overviewResponse = D3.values(rows[0]);

    var overview = D3.nest()
        .key(function(d) {
            return d.region_code;
        })
        .rollup(function(v) {
            return {
                'region_code': v[0],
                'region_name': v[1],
                'current_total': v[2],
                'delayed_total': v[3],
                'days_to_payment': v[4]
            }
        })
        .entries(overviewResponse)
        .map(function(d) {
            return d.value;
        });

    var data = {
        'overview': overview
    };

    return data;

};

