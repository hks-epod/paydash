'use strict';

var d3 = require('d3');
var queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('performance/overview');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.region_code;
        var role = request.auth.credentials.role;
        var queryString = queries.overviewPerformance(region_code, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {
            var final_dict = {};
            final_dict.monthwise = {};
            final_dict.datewise = {};

            if (role==='block') {
                
                // process state data
                var stateResponse = utils.flatten(rows[0]);
                var stateName = stateResponse[0].state_name;
                var stateCode = stateResponse[0].state_code;

                final_dict.monthwise.state = {
                    'state_code': stateCode,
                    'state_name': stateName,
                    'data': stateResponse.map(function(d) {
                        return [
                            d.year + '' + utils.padNum(d.month) + '' + utils.padNum(1),
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
                var districtResponse = utils.flatten(rows[1]);
                var districtName = districtResponse[0].district_name;
                var districtCode = districtResponse[0].district_code;
                final_dict.monthwise.district = {
                    'district_code': districtCode,
                    'district_name': districtName,
                    'data': districtResponse.map(function(d) {
                        return [
                            d.year + '' + utils.padNum(d.month) + '' + utils.padNum(1),
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

                // process block data for bottom chart (grouped by month)
                var blockResponse = utils.flatten(rows[2]);
                var blockName = blockResponse[0].block_name;
                var blockCode = blockResponse[0].block_code;
                final_dict.monthwise.block = {
                    'block_code': blockCode,
                    'block_name': blockName,
                    'data': blockResponse.map(function(d) {
                        return [
                            d.year + '' + utils.padNum(d.month) + '' + utils.padNum(1),
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

                // process block data for top chart (group by date)
                var blockResponse = utils.flatten(rows[3]);
                var blockName = blockResponse[0].block_name;
                var blockCode = blockResponse[0].block_code;
                final_dict.datewise.block = {
                    'block_code': blockCode,
                    'block_name': blockName,
                    'data': blockResponse.map(function(d) {
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

                final_dict.region_name = blockName;
            }
            

            if (role==='district') {

                // process state data
                var stateResponse = utils.flatten(rows[0]);
                var stateName = stateResponse[0].state_name;
                var stateCode = stateResponse[0].state_code;

                final_dict.monthwise.state = {
                    'state_code': stateCode,
                    'state_name': stateName,
                    'data': stateResponse.map(function(d) {
                        return [
                            d.year + '' + utils.padNum(d.month) + '' + utils.padNum(1),
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

                // process district data for bottom chart (monthwise data)
                var districtResponse = utils.flatten(rows[1]);
                var districtName = districtResponse[0].district_name;
                var districtCode = districtResponse[0].district_code;
                final_dict.top.district = {
                    'district_code': districtCode,
                    'district_name': districtName,
                    'data': districtResponse.map(function(d) {
                        return [
                            d.year + '' + utils.padNum(d.month) + '' + utils.padNum(1),
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

                // process district data for top chart (datewise data)
                var districtResponse = utils.flatten(rows[2]);
                var districtName = districtResponse[0].district_name;
                var districtCode = districtResponse[0].district_code;
                final_dict.top.district = {
                    'district_code': districtCode,
                    'district_name': districtName,
                    'data': districtResponse.map(function(d) {
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

                final_dict.region_name = districtName;
            }


            var headers = ['date', 'mrc_mre', 'mre_wlg', 'wlg_wls', 'wls_fto', 'fto_sn1', 'sn1_sn2', 'sn2_prc', 'tot_trn'];
            final_dict.config = {
                'headers': headers,
                'role': role
            };

            reply(final_dict);
        });
    }
};
