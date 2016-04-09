'use strict';

var Utils = require('./utils');

var final_dict = {};

final_dict.monthwise = {};
final_dict.datewise = {};

exports.block = function(rows) {

    // Process state data
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

    // Process district data
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

    // Process block data for bottom chart (grouped by month)
    var blockResponse = Utils.flatten(rows[2]);
    var blockName = blockResponse[0].block_name;
    var blockCode = blockResponse[0].block_code;
    final_dict.monthwise.block = {
        'block_code': blockCode,
        'block_name': blockName,
        'data': blockResponse.map(function(d) {
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

    // Process block data for top chart (group by date)
    var blockResponse = Utils.flatten(rows[3]);
    var blockName = blockResponse[0].block_name;
    var blockCode = blockResponse[0].block_code;
    final_dict.datewise.block = {
        'block_code': blockCode,
        'block_name': blockName,
        'data': blockResponse.map(function(d) {
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

    final_dict.region_name = blockName;
    return final_dict;
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
    final_dict.top.district = {
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
    final_dict.top.district = {
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
