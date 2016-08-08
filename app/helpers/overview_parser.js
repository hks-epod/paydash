'use strict';

const D3 = require('D3');

exports.parser = function(rows) {

    var overviewResponse = rows;

    var overview = D3.nest()
        .key(function(d) {
            return d.region_code;
        })
        .rollup(function(v) {
            console.log(v)
            return {
                'region_code': v[0].region_code,
                'region_name': v[0].region_name,
                'current_total': v[0].current_total,
                'delayed_total': v[0].delayed_total,
                'days_to_payment': v[0].days_to_payment
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

