'use strict';

var queries = require('../../helpers/queries');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/analysis', null, {
            layout: 'monitor'
        });
    }
};

exports.getData = {
    handler: function(request, reply) {

        var sequelize = request.server.plugins.sequelize.db.sequelize;
        var queryString = queries.outcomes();

        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {

            var results = [];
            var outcomes = data[0];
            var treatments = data[1];
            var summary = data[2];
            var arms = data[3];
            var arm_summary = data[4];

            for (var index in outcomes) {

                var result = {
                    treatment: [],
                    control: [],
                    arm_1: [],
                    arm_2: [],
                    arm_3: []
                };
                result.label = outcomes[index].label;
                result.name = outcomes[index].outcome;
                for (var treatment_index in treatments) {
                    treatments[treatment_index].value = treatments[treatment_index].mean;
                    if (treatments[treatment_index].outcome === outcomes[index].outcome && treatments[treatment_index].treatment === 1) {
                        result.treatment.push(treatments[treatment_index]);
                    }
                    if (treatments[treatment_index].outcome === outcomes[index].outcome && treatments[treatment_index].treatment === 0) {
                        result.control.push(treatments[treatment_index]);
                    }
                }
                for (var arm_index in arms) {
                    arms[arm_index].value = arms[arm_index].mean;
                    if (arms[arm_index].outcome === outcomes[index].outcome && arms[arm_index].arm === 1) {
                        result.arm_1.push(arms[arm_index]);
                    }
                    if (arms[arm_index].outcome === outcomes[index].outcome && arms[arm_index].arm === 2) {
                        result.arm_2.push(arms[arm_index]);
                    }
                    if (arms[arm_index].outcome === outcomes[index].outcome && arms[arm_index].arm === 3) {
                        result.arm_3.push(arms[arm_index]);
                    }
                }
                for (var stat_index in summary) {
                    if (summary[stat_index].outcome === outcomes[index].outcome) {
                        result.summary = summary[stat_index];
                    }
                }
                for (var arm_stat_index in arm_summary) {
                    if (arm_summary[arm_stat_index].outcome === outcomes[index].outcome) {
                        result.arm_summary = arm_summary[arm_stat_index];
                    }
                }
                results.push(result);
            }

            reply(results);
        });
    }
};
