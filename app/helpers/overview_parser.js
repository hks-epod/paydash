'use strict';

const D3 = require('d3');

exports.parser = function(rows) {
    var overviewResponse = rows;

    var overview = D3.nest()
        .key(function(d) {
            return d.region_code;
        })
        .rollup(function(v) {
            return {
                region_code: v[0].region_code,
                region_name: v[0].region_name,
                current_total: v[0].current_total,
                delayed_total: v[0].delayed_total,
                delayed_no_t5: v[0].delayed_no_t5,
                days_to_payment: v[0].days_to_payment
            };
        })
        .entries(overviewResponse)
        .map(function(d) {
            return d.value;
        });

    var data = {
        overview: overview
    };

    return data;
};
