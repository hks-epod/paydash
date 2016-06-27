'use strict';

var Utils = require('./utils');
var D3 = require('d3');
var Translate = require('../templates/helpers/t');

exports.block = function(rows, role, credentials) {
    var final_dict = {};
    var regionName = rows[0][0].region_name;

    final_dict.region_name = regionName;

    var childrenResponse = Utils.flatten(rows[1]);

    var employeeResponse = Utils.flatten(rows[2]);

    var empMapping = {
        'TA': Utils.nestEmpMapping(rows[3]),
        'GRS': Utils.nestEmpMapping(rows[4])
    };

    var employeeStats = {
        'past30': {
            'TA': Utils.nestEmpStats(rows[5]),
            'GRS': Utils.nestEmpStats(rows[6])
        },
        'past60': {
            'TA': Utils.nestEmpStats(rows[7]),
            'GRS': Utils.nestEmpStats(rows[8])
        },
        'all': {
            'TA': Utils.nestEmpStats(rows[9]),
            'GRS': Utils.nestEmpStats(rows[10])
        }
    };

    var mappingResponse = Utils.flatten(rows[11]);

    // process children data
    final_dict.discrete = D3.nest()
        .key(function(d) {
            return d.region_code;
        })
        .rollup(function(v) {
            return {
                'region_code': v[0].region_code,
                'region_name': v[0].region_name,
                'mapped_ta': empMapping.TA[v[0].region_code],
                'mapped_grs': empMapping.GRS[v[0].region_code],
                'data': v.map(function(d) {
                    return [
                        d.date.getFullYear() + '' + Utils.padNum(d.date.getMonth() + 1) + '' + Utils.padNum(d.date.getDate()),
                        d.mrc_mre,
                        d.mre_wlg,
                        d.wlg_wls,
                        d.wls_fto,
                        d.fto_sn1,
                        d.sn1_sn2,
                        d.sn2_prc,
                        d.tot_trn
                    ];
                })
            };
        })
        .entries(childrenResponse)
        .map(function(d) {
            return d.values;
        })
        .sort(function(a, b) {
            var aTarget = a.data[a.data.length - 1];
            var bTarget = b.data[b.data.length - 1];
            var aSum = aTarget[1] + aTarget[2] + aTarget[3] + aTarget[4] + aTarget[5] + aTarget[6] + aTarget[7];
            var bSum = bTarget[1] + bTarget[2] + bTarget[3] + bTarget[4] + bTarget[5] + bTarget[6] + bTarget[7];
            return bSum - aSum;
        });

    // process employee data
    final_dict.employees = D3.nest()
        .key(function(d) {
            return d.task_assign;
        })
        .rollup(function(v) {
            return D3.nest()
                .key(function(d) {
                    return d.staff_id;
                })
                .rollup(function(w) {
                    return {
                        'staff_id': w[0].staff_id,
                        'name': w[0].name,
                        'mobile': w[0].mobile_no,
                        'step1_avg_30': employeeStats.past30[w[0].task_assign][w[0].staff_id].step1_avg,
                        'tot_trans_30': employeeStats.past30[w[0].task_assign][w[0].staff_id].total_transactions || 0,
                        'step1_avg_60': employeeStats.past60[w[0].task_assign][w[0].staff_id].step1_avg,
                        'tot_trans_60': employeeStats.past60[w[0].task_assign][w[0].staff_id].total_transactions || 0,
                        'step1_avg_all': employeeStats.all[w[0].task_assign][w[0].staff_id].step1_avg,
                        'tot_trans_all': employeeStats.all[w[0].task_assign][w[0].staff_id].total_transactions || 0,
                        'panchayats': w.map(function(d) {
                            return {
                                'region_code': d.map_location,
                                'region_name': d.mapped_panchayat_name
                            };
                        })
                    };
                })
                .entries(v)
                .map(function(d) {
                    return d.values;
                });

        })
        .map(employeeResponse);

    final_dict.mapping = {
        'total_panchayat_count': mappingResponse[0].total_panchayat_count,
        'grs_panchayat_count': mappingResponse[0].grs_panchayat_count,
        'ta_panchayat_count': mappingResponse[0].ta_panchayat_count
    };

    final_dict.config = {
        'headers': ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'],
        'role': role,
        'labels': Translate('/payment_steps_labels', credentials),
        'y_axis_labels': Translate('/y_axis_labels', credentials),
        'sidebar': {
            avg_days: Translate('/performance/discrete/sidebar/avg_days', credentials),
            total_trans: Translate('/performance/discrete/sidebar/total_trans', credentials),
        }
    };

    return final_dict;
}

exports.district = function(rows, role, credentials) {

    var final_dict = {};
    var regionName = rows[0][0].region_name;

    final_dict.region_name = regionName;

    var blockResponse = Utils.flatten(rows[1]);
    var panchayatResponse = Utils.flatten(rows[2]);

    // process children data
    final_dict.discrete = D3.nest()
        .key(function(d) {
            return d.region_code;
        })
        .rollup(function(v) {
            return {
                'block_code': v[0].region_code,
                'block_name': v[0].region_name,
                'data': v.map(function(d) {
                    return [
                        d.date.getFullYear() + '' + Utils.padNum(d.date.getMonth() + 1) + '' + Utils.padNum(d.date.getDate()),
                        d.mrc_mre,
                        d.mre_wlg,
                        d.wlg_wls,
                        d.wls_fto,
                        d.fto_sn1,
                        d.sn1_sn2,
                        d.sn2_prc,
                        d.tot_trn
                    ];
                }),
                'panchayats': panchayatResponse.filter(function(d) {
                    return d.block_code === v[0].region_code;
                }).map(function(d) {
                    return {
                        'panchayat_code': d.panchayat_code,
                        'panchayat_name': d.panchayat_name
                    };
                })
            };
        })
        .entries(blockResponse)
        .map(function(d) {
            return d.values;
        })
        .sort(function(a, b) {
            var aTarget = a.data[a.data.length - 1];
            var bTarget = b.data[b.data.length - 1];
            var aSum = aTarget[1] + aTarget[2] + aTarget[3] + aTarget[4] + aTarget[5] + aTarget[6] + aTarget[7];
            var bSum = bTarget[1] + bTarget[2] + bTarget[3] + bTarget[4] + bTarget[5] + bTarget[6] + bTarget[7];
            return bSum - aSum;
        });

    final_dict.config = {
        'headers': ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'],
        'role': role,
        'labels': Translate('/payment_steps_labels', credentials),
        'y_axis_label': Translate('/y_axis_labels', credentials),
        'sidebar': {
            avg_days: Translate('/performance/discrete/sidebar/avg_days', credentials),
            total_trans: Translate('/performance/discrete/sidebar/total_trans', credentials),
        }
    };
    return final_dict;
}
