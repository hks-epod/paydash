'use strict';

const Queries = require('../../helpers/queries');
const D3 = require('d3');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/usage', null, { layout: 'monitor' });
    }
};

exports.metric = {
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;

        var queryString = Queries.usage_nav();

        // API CODE
        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            var data = D3.nest()
                .key(function(d) {
                    return d.metric;
                })
                .rollup(function(v) {
                    return {
                        'value': v[0].metric,
                        'label': v[0].metric_label,
                        'comparisons': v.filter(function(d) {
                                return d.type === 'comparison'; })
                            .map(function(d) {
                                return {
                                    'comparison': d.filter_comparison,
                                    'comparison_label': d.filter_comparison_label,
                                };
                            }),
                        'filters': D3.nest()
                            .key(function(d) {
                                return d.filter_comparison; })
                            .rollup(function(w) {
                                return {
                                    'filter': w[0].filter_comparison,
                                    'filter_label': w[0].filter_comparison_label,
                                    'options': w.map(function(d) {
                                        return {
                                            'option': d.option,
                                            'option_label': d.option_label
                                        };
                                    })
                                };
                            })
                            .entries(v.filter(function(d) {
                                return d.type === 'filter'; }))
                            .map(function(d) {
                                return d.values;
                            })
                    };
                })
                .entries(rows)
                .map(function(d) {
                    return d.values;
                });

            reply(data);

        });

    }
};
