'use strict';
var d3 = require('d3');

var queries = require('../../helpers/queries');
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
        var active_region = request.query.active_region;
        var queryString = queries.delayed_musters(active_region);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
            reply(data);
        });
    }
};
