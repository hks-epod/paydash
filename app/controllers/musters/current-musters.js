'use strict';

var Queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');
var req = require('request');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('musters/current');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var active_region = request.query.active_region;
        var queryString = Queries.current_musters(active_region);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var mustersResponse = utils.flatten(rows[0]);
            var mappingResponse = utils.flatten(rows[1]);
            
            var final_dict = {
                'musters': mustersResponse.map(function(d) {
                    return {
                        'msr_no':d.msr_no,
                        'work':d.work_name,
                        'panchayat':d.panchayat_name,
                        'grs':d.name,
                        'mobile':d.mobile_no
                    };
                }),
                'mapping': {
                    'total_panchayat_count': mappingResponse[0].total_panchayat_count,
                    'grs_panchayat_count': mappingResponse[0].grs_panchayat_count,
                }

            };
            
            reply(final_dict);
        });
    }
};
