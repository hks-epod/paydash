'use strict';
var mysql = require('mysql');
var d3 = require('d3');
var sqlpool;

module.exports.init = function(pool) {
  sqlpool = pool;
};

module.exports.blocks = function(cb) {

  sqlpool.getConnection(function(err, connection) {

    if (err) {
      console.error("An error occurred: " + err);
    }
    // TO DO :
    // escape block_code and check length
    //
    var BLOCK_CODE = "1709003";
    var queryString = "SELECT state_code,state_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM state_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'b' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.state_code in (SELECT b.state_code FROM blocks b WHERE b.block_code ='" + BLOCK_CODE + "') ORDER BY date ASC;" +
      "SELECT district_code,district_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM district_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.district_code in (SELECT b.district_code FROM blocks b WHERE b.block_code ='" + BLOCK_CODE + "') ORDER BY date ASC;" +
      "SELECT block_code,block_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code ='" + BLOCK_CODE + "' ORDER BY date ASC;" +
      "SELECT panchayat_code,panchayat_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code ='" + BLOCK_CODE + "' ORDER BY panchayat_code ASC, date ASC; select staff_id, name, designation, mobile_no, map_location, mapped_panchayat_name from employees where block_code = '" + BLOCK_CODE + "';" +
      "SELECT short_name FROM short_codes a WHERE a.state_code in (SELECT b.state_code FROM blocks b WHERE b.block_code ='" + BLOCK_CODE + "');";

    connection.query(queryString, function(err, rows) {
      if (err) {
        throw err;
      }

      var final_dict = {};
      var stateResponse = rows[0];
      var districtResponse = rows[1];
      var blockResponse = rows[2];
      var panchayatResponse = rows[3];
      var employeeResponse = rows[4];
      var shortName = rows[5][0].short_name;

      // process state data
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

      // process block data
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
          return d.designation;
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
      var finYear = getFinYear();
      var currentDate = getCurrentDate();
      var stateBlockCode = shortName + blockCode.substring(2, 4);
      final_dict.block_name = blockName;
      final_dict.alerts = [];
      final_dict.config = {
        'headers': headers,
        'mandated_days': {}
      };
      final_dict.api_helpers = {
        'musters_on_date': '164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay.aspx?fin_year=' + finYear + '&r_date=' + currentDate + '&Block_code=' + blockCode + '&state_block_code=' + stateBlockCode,
        'delayed_musters': 'http://164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay_api_3.aspx?fin_year=' + finYear + '&Block_code=' + blockCode + '&state_block_code=' + stateBlockCode + '&state_code=' + stateCode
      };

      // http://164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay.aspx?fin_year=2015-2016&r_date=2015-08-25&Block_code=1709003&state_block_code=mp09
      // http://164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay_api_3.aspx?fin_year=2015-2016&Block_code=2602001&state_block_code=PB02&state_code=26
      // console.log(JSON.stringify(final_dict));

       cb(final_dict);

      function padNum(num) {
        var str = num.toString();
        return str.length === 1 ? '0' + str : str;
      }

      function getFinYear() {
        var today = new Date();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var finYear = '';
        if (month < 4) {
          var prevYear = year - 1;
          finYear = prevYear + "-" + year;
        } else {
          var nextYear = year + 1;
          finYear = year + "-" + nextYear;
        }
        return finYear;
      }

      function getCurrentDate() {
        var today = new Date();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var day = today.getDate();
        var finYear = '';
        var date = year + '-' + padNum(month) + '-' + padNum(day);
        return date;
      }
    });



    connection.release();
  });
};
