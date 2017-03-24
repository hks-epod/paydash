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
                                    'value': d.filter_comparison,
                                    'label': d.filter_comparison_label,
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
                                            'value': d.option,
                                            'label': d.option_label
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

exports.chartData = {
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;

        // // usage_overview
        // 'SELECT 'COUNT(DISTINCT date) as day_count,
        // 'SELECT b.session_flag_count/b.day_count AS value FROM (SELECT IF(SUM(a.session_flag)/COUNT(DISTINCT a.date)=1,1,0) AS daily_user, IF(SUM(a.session_flag)/COUNT(DISTINCT a.date)=1,1,0) AS daily_user, a.user_id FROM (SELECT IF(session_count>0,1,0) as session_flag, user_id, date FROM ga_sessions GROUP BY user_id, date) a GROUP BY user_id) b;'
        // 'SELECT a.session_flag_count/a.user_count AS value, date'+compVars+' FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, date'+compVars+' FROM ga_sessions '+whereClause+'GROUP BY date'+compVars+') a;'

        // // users_1session_date
        // 'SELECT a.session_flag_count/a.user_count AS value, date FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, date FROM ga_sessions GROUP BY date) a;'
        // 'SELECT a.session_flag_count/a.user_count AS value, date'+compVars+' FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, date'+compVars+' FROM ga_sessions '+whereClause+'GROUP BY date'+compVars+') a;'

        // // users_1session_day
        // 'SELECT a.session_flag_count/a.user_count AS value, day_of_intervention FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, DATEDIFF(date,rollout_date) AS day_of_intervention FROM ga_sessions GROUP BY day_of_intervention) a;'
        // 'SELECT a.session_flag_count/a.user_count AS value, day_of_intervention'+compVars+' FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, DATEDIFF(date,rollout_date) AS day_of_intervention'+compVars+' FROM ga_sessions '+whereClause+'GROUP BY day_of_intervention'+compVars+') a;'

        // // total_users
        // 'SELECT COUNT(DISTINCT user_id) as user_count, date FROM ga_sessions GROUP BY date;'
        // 'SELECT COUNT(DISTINCT user_id) as user_count, date'+compVars+' FROM ga_sessions '+whereClause+'GROUP BY date'+compVars+';'

        // // sessions_per_user
        // 'SELECT a.session_total/a.user_count AS value, date FROM (SELECT SUM(session_count) as session_total, COUNT(DISTINCT user_id) as user_count, date FROM ga_sessions GROUP BY date) a;'
        // 'SELECT a.session_total/a.user_count AS value, date'+compVars+' FROM (SELECT SUM(session_count) as session_total, COUNT(DISTINCT user_id) as user_count, date'+compVars+' FROM ga_sessions '+whereClause+'GROUP BY date'+compVars+') a;'

        // API CODE
        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            

        });

    }
};
