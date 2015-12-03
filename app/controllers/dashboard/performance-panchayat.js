'use strict';

var d3 = require('d3');
var queries = require('../../helpers/queries');
var dummy = require('../../helpers/dummy');

exports.showPage = {
    auth: {
        strategy: 'standard'
    },
    handler: function(request, reply) {

        return reply.view('dashboard/panchayat');

    }
};


exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var block_code = request.query.selected_block_id;
        var queryString = queries.panchayatPerformance(block_code);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_dict = {};
            var blockName = rows[0][0].block_name;

            var panchayatResponse = flatten(rows[1]);
            var employeeResponse = flatten(rows[2]);

            var empMapping = {
                'TA': nestEmpMapping(rows[3]),
                'GRS': nestEmpMapping(rows[4])
            }
            
            var employeeStats = {
                'past30': {
                    'TA': nestEmpStats(rows[5]),
                    'GRS': nestEmpStats(rows[6])
                },
                'past60': {
                    'TA': nestEmpStats(rows[7]),
                    'GRS': nestEmpStats(rows[8])
                },
                'all': {
                    'TA': nestEmpStats(rows[9]),
                    'GRS': nestEmpStats(rows[10])
                }
            };

            // process panchayat data
            final_dict.panchayats = d3.nest()
                .key(function(d) {
                    return d.panchayat_code;
                })
                .rollup(function(v) {
                    return {
                        'panchayat_code': v[0].panchayat_code,
                        'panchayat_name': v[0].panchayat_name,
                        'mapped_ta': empMapping['TA'][v[0].panchayat_code],
                        'mapped_grs': empMapping['GRS'][v[0].panchayat_code],
                        'data': v.map(function(d) {
                            return [
                                d.date.getFullYear() + '' + padNum(d.date.getMonth() + 1) + '' + padNum(d.date.getDate()),
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
                .entries(panchayatResponse)
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
                                'step1_avg_30':employeeStats['past30'][w[0].task_assign][w[0].staff_id]['step1_avg'],
                                'tot_trans_30':employeeStats['past30'][w[0].task_assign][w[0].staff_id]['total_transactions'] || 0,
                                'step1_avg_60':employeeStats['past60'][w[0].task_assign][w[0].staff_id]['step1_avg'],
                                'tot_trans_60':employeeStats['past60'][w[0].task_assign][w[0].staff_id]['total_transactions'] || 0,
                                'step1_avg_all':employeeStats['all'][w[0].task_assign][w[0].staff_id]['step1_avg'],
                                'tot_trans_all':employeeStats['all'][w[0].task_assign][w[0].staff_id]['total_transactions'] || 0,
                                'panchayats': w.map(function(d) {
                                    return {
                                        'panchayat_code': d.map_location,
                                        'panchayat_name': d.mapped_panchayat_name
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

            var headers = ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'];
            final_dict.block_name = blockName;
            final_dict.config = {
                'headers': headers,
            };

            function padNum(num) {
                var str = num.toString();
                return str.length === 1 ? '0' + str : str;
            }

            function flatten(obj) { // flatten but maintain the sort where obj key == array index
                var array = [];
                var len = Object.keys(obj).length;
                for (var i=0; i<len; i++) {
                    array.push(obj[i]);
                }
                return array;
            }

            function genMapping(obj) { // generate the lookup object to determine if a panchayat has been mapped
                var lookup = {
                    'ta':{},
                    'grs':{}
                };
                obj['ta'].forEach(function(d) {
                    lookup['ta'][d.panchayat_code] = (d.task_assign === 'TA' ? true : false);
                });
                obj['grs'].forEach(function(d) {
                    lookup['grs'][d.panchayat_code] = (d.task_assign === 'GRS' ? true : false);
                });
                return lookup;
            }

            function nestEmpMapping(obj) {
                return d3.nest()
                    .key(function(d) {
                        return d.panchayat_code;
                    })
                    .rollup(function(v) {
                        return v[0].task_assign === null ? false : true;
                    })
                    .map(flatten(obj));
            }

            function nestEmpStats(obj) {
                return d3.nest()
                    .key(function(d) {
                        return d.staff_id;
                    })
                    .rollup(function(v) {
                        return {
                            'step1_avg':v[0].step1_avg,
                            'total_transactions':v[0].total_transactions
                        }
                    })
                    .map(flatten(obj));
            }

            reply(final_dict);
        });

        // reply(dummy.blockData);

    }
};
