'use strict';
var d3 = require('d3');

var queries = require('../../helpers/queries');
var musters_urls = require('../../helpers/musters');
var req = require('request');
var _ = require('lodash');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('musters/current');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var block_code = '1709003';
        var queryString = queries.apiHelper(block_code);

        musters_urls(sequelize, queryString, block_code, function(urls) {

            req(urls.musters_on_date, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    
                    var current_musters = {
                        records: _.uniq(JSON.parse(body), 'muster_no')
                    };
                    reply(current_musters);
                }
            });
        });
    }
};
