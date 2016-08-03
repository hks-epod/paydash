'use strict';

const Queries = require('../../helpers/queries');
const CardsParser = require('../../helpers/cards_parser');
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
        var userId = request.auth.credentials.id;
        var role = request.auth.credentials.role;
        var queryString = Queries.cards(userId, role);

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            if (role === 'block') {

                var cardsResponse = D3.values(rows[0]);

                var stateResponse = D3.values(rows[1]);

                var state_code = stateResponse[0].state_code;

                // Nest the cards response
                var cards = D3.nest()
                    .key(function(d) {
                        return d.block_code;
                    })
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
                                return d.type === 'delayed_musters';
                            }).map(function(d) {
                                return {
                                    'msr_no': d.msr_no,
                                    'panchayat_name': d.panchayat_name,
                                    'work_name': d.work_name,
                                    'work_code': d.work_code,
                                    'closure_date': d.end_date,
                                    'days_pending': d.days_pending
                                };
                            }),
                            'current_musters': v.filter(function(d) {
                                return d.type === 'current_musters';
                            }).map(function(d) {
                                return {
                                    'msr_no': d.msr_no,
                                    'panchayat_name': d.panchayat_name,
                                    'work_name': d.work_name,
                                    'work_code': d.work_code,
                                    'closure_date': d.end_date
                                };
                            })
                        };
                    })
                    .entries(cardsResponse)
                    .map(function(d) {
                        return { 
                            'block_code': d.key, 
                            'cards': d.value.value
                        };
                    })
                    .map(function(d) {
                        return d.value;
                    });

                var data = {
                    'cards': cards
                };

            }

            if (role === 'district') {
                // 
            }


            reply(data);
        });
    }
};
