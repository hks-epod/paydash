'use strict';
var d3 = require('d3');

var queries = require('../../helpers/queries');
var dummy = require('../../helpers/dummy');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('dashboard/block');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.selected_block_id; // Ravi: update the region code location here
        var role = 'block'; // Ravi: update the role location here

        var queryString = queries.blockPerformance(region_code,role); // Ravi: update the blockPerformance function name here

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var final_dict = {};

            // process state data
            var stateResponse = flatten(rows[0]);
            var stateName = stateResponse[0].state_name;
            var stateCode = stateResponse[0].state_code;

            final_dict.state = {
                'state_code': stateCode,
                'state_name': stateName,
                'data': stateResponse.map(function(d) {
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

            // process district data
            var districtResponse = flatten(rows[1]);
            var districtName = districtResponse[0].district_name;
            var districtCode = districtResponse[0].district_code;
            final_dict.district = {
                'district_code': districtCode,
                'district_name': districtName,
                'data': districtResponse.map(function(d) {
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

            final_dict.region_name = districtName;

            if (rows.length===3) {
                // process block data
                var blockResponse = flatten(rows[2]);
                var blockName = blockResponse[0].block_name;
                var blockCode = blockResponse[0].block_code;
                final_dict.block = {
                    'block_code': blockCode,
                    'block_name': blockName,
                    'data': blockResponse.map(function(d) {
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

                final_dict.region_name = blockName;

            }


            var headers = ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'];
            final_dict.config = {
                'headers': headers
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
