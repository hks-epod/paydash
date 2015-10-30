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
        var block_code = '1709003';
        var queryString = queries.apiHelper(block_code);

        musters_urls(sequelize, queryString, block_code, function(urls) {

            req(urls.delayed_musters, function(error, response, body) {
                if (!error && response.statusCode === 200) {

                    body = JSON.parse(body);
                    var timInt = [2, 5, 6, 7, 8];
                    var pending_musters = {};

                    timInt.forEach(function(val, index) {

                        pending_musters['ds_t' + val] = body['ds_t' + val].filter(function(muster) {

                            var start_date = moment(muster.start_date, 'DD/MM/YYYY');
                            var today = moment().startOf('day').subtract(val,'d');
                            return start_date.toDate() < today.toDate();

                        }).map(function(muster) {
                            muster.end_date = muster.End_date;
                            delete muster.End_date;
                            return muster;
                        });
                      
                    });

                    reply(pending_musters);


                }
            });
        });
    }
};
