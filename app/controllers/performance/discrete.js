'use strict';

var d3 = require('d3');
var queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');

exports.showPage = {
    auth: {
        strategy: 'standard'
    },
    handler: function(request, reply) {
        return reply.view('performance/discrete');
    }
};


exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.region_code;
        var role = request.auth.credentials.role;
        var queryString = queries.discretePerformance(region_code, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_dict = {};
            var regionName = rows[0][0].region_name;

            var childrenResponse = utils.flatten(rows[1]);

            // process children data
            final_dict.discrete = d3.nest()
                .key(function(d) {
                    return d.region_code;
                })
                .rollup(function(v) {
                    return {
                        'region_code': v[0].region_code,
                        'region_name': v[0].region_name,
                        'data': v.map(function(d) {
                            return [
                                d.date.getFullYear() + '' + utils.padNum(d.date.getMonth() + 1) + '' + utils.padNum(d.date.getDate()),
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

            var headers = ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'];
            final_dict.region_name = regionName;
            final_dict.config = {
                'headers': headers,
                'role': request.auth.credentials.role
            };

            if (rows.length > 2) { // role==='block'

                var employeeResponse = utils.flatten(rows[2]);

                var empMapping = {
                    'TA': utils.nestEmpMapping(rows[3]),
                    'GRS': utils.nestEmpMapping(rows[4])
                };

                var employeeStats = {
                    'past30': {
                        'TA': utils.nestEmpStats(rows[5]),
                        'GRS': utils.nestEmpStats(rows[6])
                    },
                    'past60': {
                        'TA': utils.nestEmpStats(rows[7]),
                        'GRS': utils.nestEmpStats(rows[8])
                    },
                    'all': {
                        'TA': utils.nestEmpStats(rows[9]),
                        'GRS': utils.nestEmpStats(rows[10])
                    }
                };

                var mappingResponse = utils.flatten(rows[11]);

                // process children data
                final_dict.discrete = d3.nest()
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
                                    d.date.getFullYear() + '' + utils.padNum(d.date.getMonth() + 1) + '' + utils.padNum(d.date.getDate()),
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
                final_dict.employees = d3.nest()
                    .key(function(d) {
                        return d.task_assign;
                    })
                    .rollup(function(v) {
                        return d3.nest()
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
            }

            reply(final_dict);
        });

    }
};
