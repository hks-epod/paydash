'use strict';
var d3 = require('d3');

var queries = require('../../helpers/queries');
var dummy = require('../../helpers/dummy');

module.exports = {
    auth: {
        strategy: 'standard'
    },
    handler: function(request, reply) {

        return reply.view('dashboard/panchayat'); // TO RAVI : NEED TO UPDATE THIS

    }
};


exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var block_code = '1709003';
        var queryString = queries.apiHelper(block_code);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {
            
            var stateCode = rows[0].state_code;
            var shortName = rows[0].short_name;
            var blockCode = block_code;

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
            
            reply(final_dict);
        });


        // reply(dummy.blockData);


    }
};
