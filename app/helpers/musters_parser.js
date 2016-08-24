'use strict';

const Utils = require('./utils');
const D3 = require('d3');

exports.block = function(rows) {
    
    var cardsResponse = D3.values(rows[0]);

    var stateResponse = D3.values(rows[1]);

    var stateCode = stateResponse[0].state_code;

    // Nest the cards response
    var cards = D3.nest()
        .key(function(d) {
            return d.block_code + d.block_name;
        })
        .key(function(d) {
            return d.staff_id;
        })
        .rollup(function(v) {
            return {
                'name': v[0].name,
                'designation': Utils.getDesignation(v[0].task_assign, stateCode),
                'mobile': v[0].mobile_no,
                'current_total': v[0].current_total,
                'delayed_total': v[0].delayed_total,
                'delayed_musters': v.filter(function(d) {
                    return d.type === 'delayed_musters';
                }).map(function(d) {
                    return {
                        'msr_no': d.msr_no,
                        'panchayat_name': d.panchayat_name,
                        'work_name': d.work_name,
                        'work_code': d.work_code,
                        'closure_date': d.end_date,
                        'days_pending': d.days_pending
                    };
                }),
                'current_musters': v.filter(function(d) {
                    return d.type === 'current_musters';
                }).map(function(d) {
                    return {
                        'msr_no': d.msr_no,
                        'panchayat_name': d.panchayat_name,
                        'work_name': d.work_name,
                        'work_code': d.work_code,
                        'closure_date': d.end_date
                    };
                })
            };
        })
        .entries(cardsResponse)
        .map(function(d) {
            return {
                'block_code': d.key.substr(0,7),
                'block_name': d.key.substr(7),
                'cards': d.values.map(function(e) { 
                    return e.values; 
                })
            };
        });

    var data = {
        'musters': cards
    };

    return data;
}

exports.district = function(rows) {

    var cardsResponse = rows;

    // Nest the cards response
    var cards = D3.nest()
        .key(function(d) {
            return d.district_code + d.district_name
        })
        .key(function(d) {
            return d.block_code;
        })
        .rollup(function(v) {
            return {
                'officers': v.map(function(d) {
                    return {
                        name: d.id == null ? 'No Data' : d.firstname + ' ' + d.lastname,
                        designation: d.designation,
                        mobile: d.mobile
                    };
                }),
                'block_code': v[0].block_code,
                'block_name': v[0].block_name,
                'current_total': v[0].current_total,
                'delayed_total': v[0].delayed_total,
                't2_total': v[0].t2_total,
                't2_avg': v[0].t2_avg,
                't5_total': v[0].t5_total,
                't5_avg': v[0].t5_avg,
                't6_total': v[0].t6_total,
                't6_avg': v[0].t6_avg,
                't7_total': v[0].t7_total,
                't7_avg': v[0].t7_avg,
                't8_total': v[0].t8_total,
                't8_avg': v[0].t8_avg
            };
        })
        .entries(cardsResponse)
        .map(function(d) {
            return {
                'district_code': d.key.substr(0,4),
                'district_name': d.key.substr(4),
                'data': d.values.map(function(e) { 
                    return e.values;
                })
            };
        });

    var data = {
        'musters': cards
    };
    
    return data;
}
