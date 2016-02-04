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
        var block_code = request.query.selected_block_id;
        var queryString = queries.current_musters(block_code);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
            reply(data);
        });

        // musters_urls(sequelize, queryString, block_code, function(data) {
        //     req(urls.musters_on_date, function(error, response, body) {
        //         if (!error && response.statusCode === 200) {
        //             var clean_musters = _.uniq(JSON.parse(body), 'muster_no');
        //             clean_musters.map(function(muster) {
        //                 muster.start_date = muster.Start_date;
        //                 delete muster.Start_date;
        //                 if (urls.employees[muster.panchayat_code + 'GRS']) {
        //                     muster.grs_name = urls.employees[muster.panchayat_code + 'GRS'].name || 'Unmapped';
        //                     muster.grs_mobile_no = urls.employees[muster.panchayat_code + 'GRS'].mobile_no || 'Unmapped';
        //                 } else {
        //                     muster.grs_name = 'Unmapped';
        //                     muster.grs_mobile_no = 'Unmapped';
        //                 }
        //                 return muster;
        //             });

        //             reply(clean_musters);
        //         }
        //     });
        // });

    }
};
