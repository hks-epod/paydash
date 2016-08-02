'use strict';

const Queries = require('../../helpers/queries');
const OverviewParser = require('../../helpers/overview_parser');
const Translate = require('../../templates/helpers/t');
const Utils = require('../../helpers/utils');
const D3 = require('d3');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('musters/cards');
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var region_code = request.query.region_code;
        var role = request.auth.credentials.role;
        var queryString = Queries.tiles(region_code, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var overviewResponse = Utils.flatten(rows[0]);

            var tilesResponse = Utils.flatten(rows[1]);

            var stateResponse = Utils.flatten(rows[2]);

            // Parse the overview response
            var current_total = overviewResponse[0].current_total;
            var delayed_total = overviewResponse[0].delayed_total;
            var days_to_payment = overviewResponse[0].time_to_payment;

            var state_code = stateResponse[0].state_code;

            if (role === 'block') {
                var tiles = D3.nest()
                    .key(function(d) {
                        return d.staff_id;
                    })
                    .rollup(function(v) {
                        return {
                            'name': v[0].name,
                            'staff_id': v[0].staff_id,
                            'designation': Utils.getDesignation(v[0].task_assign, state_code),
                            'mobile': v[0].mobile_no,
                            'block_name': v[0].block_name,
                            'current_total': v[0].current_total,
                            'delayed_total': v[0].delayed_total,
                            'delayed_musters': v.filter(function(d) {
                                return d.type === 'delayed_musters'; }).map(function(d) {
                                return [{
                                    'msr_no': d.msr_no,
                                    'panchayat_name': d.panchayat_name,
                                    'work_name': d.work_name,
                                    'work_code': d.work_code,
                                    'closure_date': d.end_date,
                                    'days_pending': d.days_pending
                                }];
                            }),
                            'current_musters': v.filter(function(d) {
                                return d.type === 'current_musters'; }).map(function(d) {
                                return [{
                                    'msr_no': d.msr_no,
                                    'panchayat_name': d.panchayat_name,
                                    'work_name': d.work_name,
                                    'work_code': d.work_code,
                                    'closure_date': d.end_date
                                }];
                            })
                        };
                    })
                    .entries(tilesResponse)
                    .map(function(d) {
                        return d.values;
                    });
            }

            if (role === 'district') {
                // 
            }

            var final_dict = {
                'overview': {
                    'current_total': current_total,
                    'delayed_total': delayed_total,
                    'days_to_payment': days_to_payment,
                    'tiles_total': tiles.length
                },
                'tiles': tiles,
                'config': {
                    role: role
                }
            };

            reply(final_dict);
        });
    }
};
