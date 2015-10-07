'use strict';
var mysql = require('mysql');
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
	var queryString = "SELECT short_name state_code FROM short_codes a WHERE a.state_code in (SELECT b.state_code FROM blocks b WHERE b.block_code ='" + BLOCK_CODE + "');";

    connection.query(queryString, function(err, rows) {
      if (err) {
        throw err;
      }

	  var stateCode = rows[0].state_code;
	  var shortName = rows[0].short_name;
	  var blockCode = BLOCK_CODE;

	  var finYear = getFinYear();
	  var currentDate = getCurrentDate();
	  var stateBlockCode = shortName + blockCode.substring(2, 4);

      final_dict = {
      'musters_on_date': '164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay.aspx?fin_year=' + finYear + '&r_date=' + currentDate + '&Block_code=' + blockCode + '&state_block_code=' + stateBlockCode,
      'delayed_musters': 'http://164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay_api_3.aspx?fin_year=' + finYear + '&Block_code=' + blockCode + '&state_block_code=' + stateBlockCode + '&state_code=' + stateCode
      };

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

      // http://164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay.aspx?fin_year=2015-2016&r_date=2015-08-25&Block_code=1709003&state_block_code=mp09
	    // http://164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay_api_3.aspx?fin_year=2015-2016&Block_code=2602001&state_block_code=PB02&state_code=26
	    // console.log(JSON.stringify(final_dict));
	    connection.release();
	    cb(final_dict);

    });

  });
};