'use strict';
var d3 = require('d3');

var queries = require('../../helpers/queries');
var musters_urls = require('../../helpers/musters');
var req = require('request');
var _ = require('lodash');
var moment = require('moment');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('musters/delayed');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var block_code = request.query.selected_block_id;
        var queryString = queries.apiHelper(block_code);

        musters_urls(sequelize, queryString, block_code, function(urls) {

            urls.employees = _.mapKeys(urls.employees, function(value, key) {
                return value.map_location + value.task_assign;
            });
            req(urls.delayed_musters, function(error, response, body) {
                if (!error && response.statusCode === 200) {

                    body = JSON.parse(body);
                    var timInt = [2, 5, 6, 7, 8];
                    var pending_musters = {};

                    timInt.forEach(function(val, index) {
                        pending_musters['ds_t' + val] = body['ds_t' + val].filter(function(muster) {
                            var start_date = moment(muster.start_date, 'DD/MM/YYYY');
                            var today = moment().startOf('day').subtract(val, 'd');
                            return start_date.toDate() < today.toDate();
                        }).map(function(muster) {

                            if (urls.employees[muster.panchayat_code + 'GRS']) {
                                muster.grs_name = urls.employees[muster.panchayat_code + 'GRS'].name;
                                muster.grs_mobile_no = urls.employees[muster.panchayat_code + 'GRS'].mobile_no;
                            }
                            if (urls.employees[muster.panchayat_code + 'TA']) {
                                muster.ta_name = urls.employees[muster.panchayat_code + 'TA'].name;
                                muster.ta_mobile_no = urls.employees[muster.panchayat_code + 'TA'].mobile_no;
                            }
                            //  append days pending 
                            var a = moment().startOf('day').subtract(val, 'd');
                            var b = moment(muster.end_date, 'DD/MM/YYYY');
                            muster.days_pending = a.diff(b, 'days');


                            return muster;
                        });
                    });

                    reply(pending_musters);

                }
            });
        });
    }
};
