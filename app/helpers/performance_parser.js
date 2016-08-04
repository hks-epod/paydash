'use strict';

var Utils = require('./utils');
const D3 = require('D3');

exports.block = function(rows) {

    // Process state data
    var stateResponse = D3.values(rows[0]);
    var stateName = stateResponse[0].state_name;
    var stateCode = stateResponse[0].state_code;

    var statePerformance = {
        'state_code': stateCode,
        'state_name': stateName,
        'data': stateResponse.map(function(d) {
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
        'district_code': districtCode,
        'district_name': districtName,
        'data': districtResponse.map(function(d) {
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
                'block_code': v[0].block_code,
                'block_name': v[0].block_name,
                'data': v.map(function(d) {
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
        })
        // .sort(function(a, b) {
        //     var aTarget = a.data[a.data.length - 1];
        //     var bTarget = b.data[b.data.length - 1];
        //     var aSum = aTarget[1] + aTarget[2] + aTarget[3] + aTarget[4] + aTarget[5] + aTarget[6] + aTarget[7];
        //     var bSum = bTarget[1] + bTarget[2] + bTarget[3] + bTarget[4] + bTarget[5] + bTarget[6] + bTarget[7];
        //     return bSum - aSum;
        // });


    // Process list of panchayat names and codes
    var panchayatResponse = D3.values(rows[3]);
    // Nest the panchayat response
    var panchayatPerformance = D3.nest()
        .key(function(d) {
            return d.block_code;
        })
        .key(function(d) {
            return d.panchayat_code;
        })
        .rollup(function(v) {
            return {
                'panchayat_code': v[0].panchayat_code,
                'panchayat_name': v[0].panchayat_name,
                'data': v.map(function(d) {
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
                'block_name': d.key,
                'data': d.values.map(function(e) { return e.values; })
            };
        });
        // .sort(function(a, b) {
        //     var aTarget = a.data[a.data.length - 1];
        //     var bTarget = b.data[b.data.length - 1];
        //     var aSum = aTarget[1] + aTarget[2] + aTarget[3] + aTarget[4] + aTarget[5] + aTarget[6] + aTarget[7];
        //     var bSum = bTarget[1] + bTarget[2] + bTarget[3] + bTarget[4] + bTarget[5] + bTarget[6] + bTarget[7];
        //     return bSum - aSum;
        // });

    


    return data;
}

exports.district = function(rows) {


    // process state data
    var stateResponse = Utils.flatten(rows[0]);
    var stateName = stateResponse[0].state_name;
    var stateCode = stateResponse[0].state_code;

    final_dict.monthwise.state = {
        'state_code': stateCode,
        'state_name': stateName,
        'data': stateResponse.map(function(d) {
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

    // Process district data for bottom chart (monthwise data)
    var districtResponse = Utils.flatten(rows[1]);
    var districtName = districtResponse[0].district_name;
    var districtCode = districtResponse[0].district_code;
    final_dict.monthwise.district = {
        'district_code': districtCode,
        'district_name': districtName,
        'data': districtResponse.map(function(d) {
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

    // Process district data for top chart (datewise data)
    var districtResponse = Utils.flatten(rows[2]);
    var districtName = districtResponse[0].district_name;
    var districtCode = districtResponse[0].district_code;
    final_dict.datewise.district = {
        'district_code': districtCode,
        'district_name': districtName,
        'data': districtResponse.map(function(d) {
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

    final_dict.region_name = districtName;
    return final_dict;
}
