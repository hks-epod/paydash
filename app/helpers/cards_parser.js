'use strict';

var Utils = require('./utils');
const D3 = require('D3');

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
                'staff_id': v[0].staff_id,
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
        .entries(data)
        .map(function(d) {
            return {
                'block_code': d.key.substr(0,7),
                'block_name': d.key.substr(7,),
                'cards': d.values.map(function(e) { 
                    return e.values; 
                })
            };
        });

    var data = {
        'cards': cards
    };

    return data;
}

exports.district = function(rows) {


    return data;
}
