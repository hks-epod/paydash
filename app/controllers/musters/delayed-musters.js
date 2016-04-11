'use strict';

var Queries = require('../../helpers/queries');
var utils = require('../../helpers/utils');
var req = require('request');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('musters/delayed');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var active_region = request.query.active_region;
        var queryString = Queries.delayed_musters(active_region);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {
            var mustersResponse = utils.flatten(rows[0]);
            var mappingResponse = utils.flatten(rows[1]);
            
            var final_dict = {
                'musters': {
                    'ds_t2': mustersResponse.filter(function(d) { return d.step==='ds_t2'; }).map(function(d) {
                        return {
                            'msr_no':d.msr_no,
                            'work_name':d.work_name,
                            'panchayat_name':d.panchayat_name,
                            'closure_date':d.end_date,
                            'days_pending':d.days_pending,
                            'name':d.name,
                            'mobile':d.mobile_no
                        };
                    }),
                    'ds_t5': mustersResponse.filter(function(d) { return d.step==='ds_t5'; }).map(function(d) {
                        return {
                            'msr_no':d.msr_no,
                            'work_name':d.work_name,
                            'panchayat_name':d.panchayat_name,
                            'closure_date':d.end_date,
                            'days_pending':d.days_pending,
                            'name':d.name,
                            'mobile':d.mobile_no
                        };
                    }),
                    'ds_t6': mustersResponse.filter(function(d) { return d.step==='ds_t6'; }).map(function(d) {
                        return {
                            'msr_no':d.msr_no,
                            'work_name':d.work_name,
                            'panchayat_name':d.panchayat_name,
                            'closure_date':d.end_date,
                            'days_pending':d.days_pending
                        };
                    }),
                    'ds_t7': mustersResponse.filter(function(d) { return d.step==='ds_t7'; }).map(function(d) {
                        return {
                            'msr_no':d.msr_no,
                            'work_name':d.work_name,
                            'panchayat_name':d.panchayat_name,
                            'closure_date':d.end_date,
                            'days_pending':d.days_pending
                        };
                    }),
                    'ds_t8': mustersResponse.filter(function(d) { return d.step==='ds_t8'; }).map(function(d) {
                        return {
                            'msr_no':d.msr_no,
                            'work_name':d.work_name,
                            'panchayat_name':d.panchayat_name,
                            'closure_date':d.end_date,
                            'days_pending':d.days_pending
                        };
                    })

                },
                'mapping': {
                    'total_panchayat_count': mappingResponse[0].total_panchayat_count,
                    'grs_panchayat_count': mappingResponse[0].grs_panchayat_count,
                    'ta_panchayat_count': mappingResponse[0].ta_panchayat_count  
                }

            };

            reply(final_dict);
        });
    }
};
