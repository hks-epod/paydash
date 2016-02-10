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
        var region_code = request.query.selected_block_id; // Ravi: update the region code location here
        var role = 'block'; // Ravi: update the role location here
        
        var queryString = queries.panchayatPerformance(block_code,role); // Ravi: update the name of this function


        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_dict = {};
            var regionName = rows[0][0].region_name;

            var childrenResponse = flatten(rows[1]);
            
            // process children data
            final_dict.children = d3.nest()
                .key(function(d) {
                    return d.region_code;
                })
                .rollup(function(v) {
                    return {
                        'region_code': v[0].region_code,
                        'region_name': v[0].region_name,
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
            };

            if (rows.length>2) { // role==='block'

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

                // process children data
                final_dict.children = d3.nest()
                    .key(function(d) {
                        return d.region_code;
                    })
                    .rollup(function(v) {
                        return {
                            'region_code': v[0].region_code,
                            'region_name': v[0].region_name,
                            'mapped_ta': empMapping['TA'][v[0].region_code],
                            'mapped_grs': empMapping['GRS'][v[0].region_code],
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
                                    'step1_avg_30':employeeStats['past30'][w[0].task_assign][w[0].staff_id]['step1_avg'],
                                    'tot_trans_30':employeeStats['past30'][w[0].task_assign][w[0].staff_id]['total_transactions'] || 0,
                                    'step1_avg_60':employeeStats['past60'][w[0].task_assign][w[0].staff_id]['step1_avg'],
                                    'tot_trans_60':employeeStats['past60'][w[0].task_assign][w[0].staff_id]['total_transactions'] || 0,
                                    'step1_avg_all':employeeStats['all'][w[0].task_assign][w[0].staff_id]['step1_avg'],
                                    'tot_trans_all':employeeStats['all'][w[0].task_assign][w[0].staff_id]['total_transactions'] || 0,
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
            }

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

            function nestEmpMapping(obj) {
                return d3.nest()
                    .key(function(d) {
                        return d.region_code;
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
