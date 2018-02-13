'use strict';

const Utils = require('./utils');
const D3 = require('d3');

exports.block = function(rows) {
    // Process state data
    var stateResponse = D3.values(rows[0]);
    var stateName = stateResponse[0].state_name;
    var stateCode = stateResponse[0].state_code;

    var statePerformance = {
        state_code: stateCode,
        state_name: stateName,
        data: stateResponse.filter(function(d) { return d.tot_trn!==null; })
            .map(function(d) {
            return [
                d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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

    // Process district data (can only be 1 district per block official)
    var districtResponse = D3.values(rows[1]);
    var districtName = districtResponse[0].district_name;
    var districtCode = districtResponse[0].district_code;
    var districtPerformance = {
        district_code: districtCode,
        district_name: districtName,
        data: districtResponse.filter(function(d) { return d.tot_trn!==null; })
            .map(function(d) {
            return [
                d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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

    // Process block data for bottom chart (grouped by month)
    var blockResponse = D3.values(rows[2]);
    var blockName = blockResponse[0].block_name;
    var blockCode = blockResponse[0].block_code;

    // Nest the block response (may be multiple blocks)
    var blockPerformance = D3.nest()
        .key(function(d) {
            return d.block_code;
        })
        .rollup(function(v) {
            return {
                block_code: v[0].block_code,
                block_name: v[0].block_name,
                data: v.filter(function(d) { return d.tot_trn!==null; })
                    .map(function(d) {
                    return [
                        d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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
        .entries(blockResponse)
        .map(function(d) {
            return d.value;
        });

    // Process list of panchayat names and codes
    var panchayatResponse = D3.values(rows[3]);

    // Nest the panchayat response
    var panchayatPerformance = D3.nest()
        .key(function(d) {
            return d.block_code + d.block_name;
        })
        .key(function(d) {
            return d.panchayat_code;
        })
        .rollup(function(v) {
            return {
                panchayat_code: v[0].panchayat_code,
                panchayat_name: v[0].panchayat_name,
                data: v.filter(function(d) { return d.tot_trn!==null; })
                    .map(function(d) {
                    return [
                        d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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
            return {
                block_code: d.key.substr(0, 7),
                block_name: d.key.substr(7),
                data: d.values.map(function(e) {
                    return e.value;
                })
            };
        });

    var data = {
        performance: {
            state: statePerformance,
            district: districtPerformance,
            block: blockPerformance,
            panchayat: panchayatPerformance
        }
    };

    return data;
};

exports.district = function(rows) {
    // Process state data
    var stateResponse = D3.values(rows[0]);
    var stateName = stateResponse[0].state_name;
    var stateCode = stateResponse[0].state_code;

    var statePerformance = {
        state_code: stateCode,
        state_name: stateName,
        data: stateResponse.filter(function(d) { return d.tot_trn!==null; })
            .map(function(d) {
            return [
                d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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

    // Process district data for bottom chart (grouped by month)
    var districtResponse = D3.values(rows[1]);

    // Nest the block response (may be multiple blocks)
    var districtPerformance = D3.nest()
        .key(function(d) {
            return d.district_code;
        })
        .rollup(function(v) {
            return {
                district_code: v[0].district_code,
                district_name: v[0].district_name,
                data: v.filter(function(d) { return d.tot_trn!==null; })
                    .map(function(d) {
                    return [
                        d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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
        .entries(districtResponse)
        .map(function(d) {
            return d.value;
        });

    // Process list of block names and codes
    var blockResponse = D3.values(rows[2]);

    // Nest the block response
    var blockPerformance = D3.nest()
        .key(function(d) {
            return d.district_code + d.district_name;
        })
        .key(function(d) {
            return d.block_code;
        })
        .rollup(function(v) {
            return {
                block_code: v[0].block_code,
                block_name: v[0].block_name,
                data: v.filter(function(d) { return d.tot_trn!==null; })
                    .map(function(d) {
                    return [
                        d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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
        .entries(blockResponse)
        .map(function(d) {
            return {
                district_code: d.key.substr(0, 4),
                district_name: d.key.substr(4),
                data: d.values.map(function(e) {
                    return e.value;
                })
            };
        });

    var data = {
        performance: {
            state: statePerformance,
            district: districtPerformance,
            block: blockPerformance
        }
    };

    return data;
};


exports.state = function(rows) {

    // Process district data for bottom chart (grouped by month)
    var stateResponse = D3.values(rows[0]);

    // Nest the district response
    var statePerformance = D3.nest()
        .key(function(d) {
            return d.state_code;
        })
        .rollup(function(v) {
            return {
                state_code: v[0].state_code,
                state_name: v[0].state_name,
                data: v.filter(function(d) { return d.tot_trn!==null; })
                    .map(function(d) {
                    return [
                        d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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
        .entries(stateResponse)
        .map(function(d) {
            return d.value;
        });

    // Process list of block names and codes
    var districtResponse = D3.values(rows[1]);

    // Nest the block response
    var districtPerformance = D3.nest()
        .key(function(d) {
            return d.state_code + d.state_name;
        })
        .key(function(d) {
            return d.district_code;
        })
        .rollup(function(v) {
            return {
                district_code: v[0].district_code,
                district_name: v[0].district_name,
                data: v.filter(function(d) { return d.tot_trn!==null; })
                    .map(function(d) {
                    return [
                        d.year + '' + Utils.padNum(d.month) + '' + Utils.padNum(1),
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
        .entries(districtResponse)
        .map(function(d) {
            return {
                state_code: d.key.substr(0, 2),
                state_name: d.key.substr(2),
                data: d.values.map(function(e) {
                    return e.value;
                })
            };
        });

    var data = {
        performance: {
            state: statePerformance,
            district: districtPerformance
        }
    };

    return data;
};
