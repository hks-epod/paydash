'use strict';

module.exports = function(sequelize, queryString, block_code, cb) {

    sequelize.query(queryString, {
        type: sequelize.QueryTypes.SELECT
    }).then(function(rows) {

        console.log(rows);

        
        var stateCode = rows[0].state_code;
        var shortName = rows[0].short_name;
        var blockCode = block_code;


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
                finYear = prevYear + '-' + year;
            } else {
                var nextYear = year + 1;
                finYear = year + '-' + nextYear;
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
        var finYear = getFinYear();
        var currentDate = getCurrentDate();
        var stateBlockCode = shortName + blockCode.substring(2, 4);


        var final_dict = {
            'musters_on_date': 'http://164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay.aspx?fin_year=' + finYear + '&r_date=' + currentDate + '&Block_code=' + blockCode + '&state_block_code=' + stateBlockCode,
            'delayed_musters': 'http://164.100.129.6/Netnrega/nrega-reportdashboard/api/dashboard_delay_api_3.aspx?fin_year=' + finYear + '&Block_code=' + blockCode + '&state_block_code=' + stateBlockCode + '&state_code=' + stateCode
        };


        cb(final_dict);

    });

};
