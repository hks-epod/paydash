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
                staff_id: v[0].staff_id,
                name: v[0].name,
                designation: v[0].task_assign,
                mobile: v[0].mobile_no,
                current_total: v[0].current_total,
                delayed_total: v[0].delayed_total,
                delayed_musters: v
                    .filter(function(d) {
                        return d.type === 'delayed_musters';
                    })
                    .map(function(d) {
                        return {
                            msr_no: d.msr_no,
                            panchayat_name: d.panchayat_name,
                            work_name: d.work_name,
                            work_code: d.work_code,
                            closure_date: d.end_date,
                            days_pending: d.days_pending,
                            step: d.step
                        };
                    }).sort(function(a,b) {
                        var aStep = a.step;
                        var bStep = b.step;
                        var aMsr_no = a.msr_no;
                        var bMsr_no = b.msr_no;

                        if (aStep > bStep) return 1;
                        if (aStep < bStep) return -1;
                        if (aMsr_no > bMsr_no) return 1;
                        if (aMsr_no < bMsr_no) return -1;
                        return 0;
                    }),
                current_musters: v
                    .filter(function(d) {
                        return d.type === 'current_musters';
                    })
                    .map(function(d) {
                        return {
                            msr_no: d.msr_no,
                            panchayat_name: d.panchayat_name,
                            work_name: d.work_name,
                            work_code: d.work_code,
                            closure_date: d.end_date
                        };
                    })
            };
        })
        .entries(cardsResponse)
        .map(function(d) {
            return {
                region_type: 'block',
                region_code: d.key.substr(0, 7),
                region_name: d.key.substr(7),
                cards: d.values
                    .map(function(e) {
                        return e.value;
                    })
                    .sort(function(a, b) {
                        var aActive = a.current_total + a.delayed_total > 0 ? 1 : 0;
                        var bActive = b.current_total + b.delayed_total > 0 ? 1 : 0;
                        var aUnmapped = a.name === 'Unmapped' ? 1 : 0;
                        var bUnmapped = b.name === 'Unmapped' ? 1 : 0;

                        // ORDER BY active DESC, unmapped, delayed_total DESC, current_total DESC, name;"

                        if (aActive < bActive) return 1;
                        if (aActive > bActive) return -1;
                        if (aUnmapped < bUnmapped) return -1;
                        if (aUnmapped > bUnmapped) return 1;
                        if (a.delayed_total < b.delayed_total) return 1;
                        if (a.delayed_total > b.delayed_total) return -1;
                        if (a.current_total < b.current_total) return 1;
                        if (a.current_total > b.current_total) return -1;
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    })
            };
        });

    var data = {
        musters: cards
    };

    return data;
};

exports.district = function(rows) {
    var cardsResponse = rows;

    // Nest the cards response
    var cards = D3.nest()
        .key(function(d) {
            return d.district_code + d.district_name;
        })
        .key(function(d) {
            return d.block_code;
        })
        .rollup(function(v) {
            return {
                officers: v
                    .map(function(d) {
                        return {
                            officer_id: d.block_code + '_' + d.designation_id,
                            name: Utils.buildName(d.firstname, d.lastname),
                            designation: d.designation,
                            designation_id: d.designation_id,
                            mobile: d.mobile
                        };
                    })
                    .sort(function(a, b) {
                        return a.designation_id - b.designation_id;
                    }),
                block_code: v[0].block_code,
                block_name: v[0].block_name,
                current_total: v[0].current_total,
                delayed_total: v[0].delayed_total,
                days_to_payment: v[0].days_to_payment,
                t2_total: v[0].t2_total,
                t2_avg: v[0].t2_avg,
                t5_total: v[0].t5_total,
                t5_avg: v[0].t5_avg,
                t6_total: v[0].t6_total,
                t6_avg: v[0].t6_avg,
                t7_total: v[0].t7_total,
                t7_avg: v[0].t7_avg,
                t8_total: v[0].t8_total,
                t8_avg: v[0].t8_avgw
            };
        })
        .entries(cardsResponse)
        .map(function(d) {
            return {
                region_type: 'district',
                region_code: d.key.substr(0, 4),
                region_name: d.key.substr(4),
                cards: d.values
                    .map(function(e) {
                        return e.value;
                    })
                    .sort(function(a, b) {
                        if (a.block_name.toLowerCase() < b.block_name.toLowerCase()) return -1;
                        if (a.block_name.toLowerCase() > b.block_name.toLowerCase()) return 1;
                        return 0;
                    })
            };
        });

    var data = {
        musters: cards
    };

    return data;
};
