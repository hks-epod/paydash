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
        var block_code = '1709003';
        var queryString = queries.panchayatPerformance(block_code);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_dict = {};
            var blockName = rows[0][0].block_name;

            var panchayatResponse = flatten(rows[1]);
            var employeeResponse = flatten(rows[2]);

            // process panchayat data
            final_dict.panchayats = d3.nest()
                .key(function(d) {
                    return d.panchayat_code;
                })
                .rollup(function(v) {
                    return {
                        'panchayat_code': v[0].panchayat_code,
                        'panchayat_name': v[0].panchayat_name,
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

            reply(final_dict);
        });


        // reply(dummy.blockData);


    }
};
