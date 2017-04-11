'use strict';

const Queries = require('../../helpers/queries');
const D3 = require('d3');
const Joi = require('joi');
const Utils = require('../../helpers/utils');

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
                        'comparisons': [
                            {
                                'value': 'overall',
                                'label': 'None'
                            }
                            ].concat(v.filter(function(d) {
                                return d.type === 'comparison';
                            })
                            .map(function(d) {
                                return {
                                    'value': d.filter_comparison,
                                    'label': d.filter_comparison_label,
                                };
                            })),
                        'filters': D3.nest()
                            .key(function(d) {
                                return d.filter_comparison;
                            })
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
                                return d.type === 'filter';
                            }))
                            .map(function(d) {
                                return d.value;
                            })
                    };
                })
                .entries(rows)
                .map(function(d) {
                    return d.value;
                });

            reply(data);

        });

    }
};

exports.data = {
    validate: {
        payload: { // payload for POST, query for GET
            metric: Joi.string().min(3).max(50),
            comparison: Joi.string().min(6).max(20),
            filter: Joi.object()
        },
        failAction: function(request, reply, source, error) {
            return reply('Invalid parameters');
        },
    },
    handler: function(request, reply) {

        var metric = request.payload.metric;
        var comparison = request.payload.comparison;
        var filter = request.payload.filter;
        var sequelize = request.server.plugins.sequelize.db.sequelize;

        // var metric = 'users_1session_day';
        // var metric = 'total_users';
        // var comparison = 'overall';
        // var filter = {
        //     // 'platform': ['web','mobile'],
        //     'treatment_role': ['t1d','t3d','t2b','t3b'],
        //     'state_code': ['17'],
        //     'officer_type': ['d1','d2','b1','b2']
        // };
        console.log(metric);
        console.log(comparison);
        console.log(filter);

        // Use the filter data to construct the conditional clause for the query
        var filter_types = Object.keys(filter);
        var clauseArray = [];
        filter_types.forEach(function(d) {
            if (filter[d].length>0) {
                clauseArray.push(d+" IN ('"+filter[d].map(function(e) { return e.value; }).join("','")+"')");
            }
        });
        var whereClause = (clauseArray.length>0) ? 'WHERE '+clauseArray.join(' AND ')+' ' : '';

        // Use the comparison data to construct the comparison strings for the query
        if (comparison==='overall') {
            var compText = '';
            var compTextAs = ',"overall" AS comparison';
            var joinText = '';
        }
        else {
            var compText = ','+comparison;
            var compTextAs = compText+' AS comparison';
            var joinText = ' AND a.'+comparison+'=b.'+comparison;        
        }

        var queryTemplates = {
            'users_1session_date':'SELECT a.session_flag_count/a.user_count AS value, date'+compTextAs+' FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+') a;',
            'users_1session_day':'SELECT a.session_flag_count/a.user_count AS value, day_of_intervention'+compTextAs+' FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, DATEDIFF(date,rollout_date) AS day_of_intervention'+compText+' FROM ga_sessions '+whereClause+'GROUP BY day_of_intervention'+compText+') a;',
            'total_users':'SELECT COUNT(DISTINCT user_id) as value, date'+compTextAs+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+';',
            'sessions_per_user':'SELECT a.session_total/a.user_count AS value, date'+compTextAs+' FROM (SELECT SUM(session_count) as session_total, COUNT(DISTINCT user_id) as user_count, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+') a;',
            'session_duration':'SELECT AVG(a.avg_session_duration) AS value, a.date'+compTextAs+' FROM (SELECT SUM(session_duration)/SUM(session_count) AS avg_session_duration,user_id,date'+compText+' FROM ga_sessions WHERE session_count>0 '+whereClause.replace('WHERE','AND')+'GROUP BY user_id,date'+compText+') a GROUP BY date'+compText+';',
            'chart_duration':'SELECT AVG(c.time_per_session) AS value, date'+compTextAs+' FROM (SELECT a.view_duration/b.session_count AS time_per_session,a.user_id, a.date'+compText+' FROM (SELECT SUM(view_duration) as view_duration, date, user_id'+compText+' FROM ga_chart_views '+whereClause+'GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';',
            'cards_per_session_mobile':'SELECT AVG(c.cards_per_session) AS value, date'+compTextAs+' FROM (SELECT a.view_count/b.session_count AS cards_per_session,a.user_id, a.date'+compText+' FROM (SELECT SUM(z.view_count) as view_count, z.date, z.user_id'+compText+' FROM (SELECT view_count, date, user_id'+compText+' FROM ga_block_card_views_mobile '+whereClause+'UNION SELECT view_count, date, user_id'+compText+' FROM ga_district_card_views_mobile '+whereClause+') z GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';',
            'calls_per_session':'SELECT AVG(c.calls_per_session) AS value, date'+compTextAs+' FROM (SELECT a.call_count/b.session_count AS calls_per_session,a.user_id, a.date'+compText+' FROM (SELECT SUM(z.call_count) as call_count, z.date, z.user_id'+compText+' FROM (SELECT call_count, date, user_id'+compText+' FROM ga_block_calls '+whereClause+'UNION SELECT call_count, date, user_id'+compText+' FROM ga_district_calls '+whereClause+') z GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';',
            'call_duration':'SELECT AVG(a.avg_call_duration) AS value, a.date'+compTextAs+' FROM (SELECT SUM(z.call_duration)/SUM(z.call_count) AS avg_call_duration,user_id,date'+compText+' FROM (SELECT call_count, call_duration, date, user_id'+compText+' FROM ga_block_calls '+whereClause+'UNION SELECT call_count, call_duration, date, user_id'+compText+' FROM ga_district_calls '+whereClause+') z WHERE call_count>0 GROUP BY user_id,date'+compText+') a GROUP BY date'+compText+';',
            'whatsapp_per_session':'SELECT AVG(c.whatsapp_per_session) AS value, date'+compTextAs+' FROM (SELECT a.message_count/b.session_count AS whatsapp_per_session,a.user_id, a.date'+compText+' FROM (SELECT SUM(z.message_count) as message_count, z.date, z.user_id'+compText+' FROM (SELECT message_count, date, user_id'+compText+' FROM ga_block_whatsapp_contacts '+whereClause+'UNION SELECT message_count, date, user_id'+compText+' FROM ga_district_whatsapp_contacts '+whereClause+') z GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';'
        };
        // average time on charts per session per user            
            // SELECT AVG(c.time_per_session) AS avg_chart_duration, date'+compTextAs+' FROM 
            // (SELECT a.view_duration/b.session_count AS time_per_session,a.user_id, a.date'+compText+'
            // FROM (SELECT SUM(view_duration) as view_duration, date, user_id'+compText+' FROM ga_chart_views GROUP BY user_id,date'+compText+') a 
            // LEFT JOIN 
            // (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions GROUP BY user_id,date'+compText+') b
            // ON a.date = b.date AND a.user_id = b.user_id'+joinText+'
            // ) c GROUP BY c.date'+compText+';

        // average card views per session per user            
            // SELECT AVG(c.cards_per_session) AS value, date'+compTextAs+' FROM (SELECT a.view_count/b.session_count AS cards_per_session,a.user_id, a.date'+compText+'FROM (SELECT SUM(z.view_count) as view_count, z.date, z.user_id'+compText+' FROM (SELECT view_count, date, user_id'+compText+' FROM ga_block_card_views_mobile '+whereClause+'UNION SELECT view_count, date, user_id'+compText+' FROM ga_district_card_views_mobile '+whereClause+') z GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';
        
        // average calls per session per user            
            // SELECT AVG(c.calls_per_session) AS avg_calls, date'+compTextAs+' FROM 
            // (SELECT a.call_count/b.session_count AS calls_per_session,a.user_id, a.date'+compText+'
            // FROM (SELECT SUM(z.call_count) as call_count, z.date, z.user_id'+compText+' FROM (SELECT call_count, date, user_id'+compText+' FROM ga_block_calls '+whereClause+'UNION SELECT call_count, date, user_id'+compText+' FROM ga_district_calls '+whereClause+') z GROUP BY user_id,date'+compText+') a 
            // LEFT JOIN 
            // (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b
            // ON a.date = b.date AND a.user_id = b.user_id'+joinText+'
            // ) c GROUP BY c.date'+compText+';

        // average call duration per call per user
        // SELECT AVG(a.avg_call_duration) AS avg_call_duration, a.date'+compTextAs+' FROM (SELECT SUM(z.call_duration)/SUM(z.call_count) AS avg_call_duration,user_id,date'+compText+' FROM (SELECT call_count, call_duration, date, user_id'+compText+' FROM ga_block_calls '+whereClause+'UNION SELECT call_count, call_duration, date, user_id'+compText+' FROM ga_district_calls '+whereClause+') z WHERE call_count>0 GROUP BY user_id,date'+compText+') a GROUP BY date'+compText+';
        
        // average whatsapp actions per session per user            
            // SELECT AVG(c.whatsapp_per_session) AS avg_whatsapp_actions, date'+compTextAs+' FROM 
            // (SELECT a.message_count/b.session_count AS whatsapp_per_session,a.user_id, a.date'+compText+'
            // FROM (SELECT SUM(z.message_count) as message_count, z.date, z.user_id'+compText+' FROM (SELECT message_count, date, user_id'+compText+' FROM ga_block_whatsapp_contacts '+whereClause+'UNION SELECT message_count, date, user_id'+compText+' FROM ga_district_whatsapp_contacts '+whereClause+') z GROUP BY user_id,date'+compText+') a 
            // LEFT JOIN 
            // (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date+compText+') b
            // ON a.date = b.date AND a.user_id = b.user_id'+joinText+'
            // ) c GROUP BY c.date+compText+';



        // 'users_1session_date'
        // 'users_1session_day'
        // 'total_users'
        // 'sessions_per_user'
        // 'session_duration'



        var queryString = queryTemplates[metric] + "SELECT distinct metric,metric_label,chart_type,band,x_label,y_label FROM usage_metrics WHERE metric='"+metric+"';";

        console.log(queryString);
        // // usage_overview
        // 'SELECT 'COUNT(DISTINCT date) as day_count,
        // 'SELECT b.session_flag_count/b.day_count AS value FROM (SELECT IF(SUM(a.session_flag)/COUNT(DISTINCT a.date)=1,1,0) AS daily_user, IF(SUM(a.session_flag)/COUNT(DISTINCT a.date)=1,1,0) AS daily_user, a.user_id FROM (SELECT IF(session_count>0,1,0) as session_flag, user_id, date FROM ga_sessions GROUP BY user_id, date) a GROUP BY user_id) b;'
        // 'SELECT a.session_flag_count/a.user_count AS value, date'+compText+' FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+') a;'

        // // users_1session_date
        // 'SELECT a.session_flag_count/a.user_count AS value, date FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, date FROM ga_sessions GROUP BY date) a;'

        // // users_1session_day
        // 'SELECT a.session_flag_count/a.user_count AS value, day_of_intervention FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, DATEDIFF(date,rollout_date) AS day_of_intervention FROM ga_sessions GROUP BY day_of_intervention) a;'

        // // total_users
        // 'SELECT COUNT(DISTINCT user_id) as user_count, date FROM ga_sessions GROUP BY date;'
        // 'SELECT COUNT(DISTINCT user_id) as user_count, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+';'

        // // sessions_per_user
        // 'SELECT a.session_total/a.user_count AS value, date FROM (SELECT SUM(session_count) as session_total, COUNT(DISTINCT user_id) as user_count, date FROM ga_sessions GROUP BY date) a;'
        // 'SELECT a.session_total/a.user_count AS value, date'+compText+' FROM (SELECT SUM(session_count) as session_total, COUNT(DISTINCT user_id) as user_count, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+') a;'

        // API CODE
        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            // if (chart_type==='line'):
            var chart_data = D3.nest()
                .key(function(d) {
                    return d.comparison;
                })
                .rollup(function(v) {
                    return {
                        'option': v[0].comparison,
                        'option_label': v[0].comparison,
                        'line_data': v.map(function(d) {
                            return {
                                'y_var': d.value,
                                'x_var': d.day_of_intervention || d.date.getFullYear() + '' + Utils.padNum(d.date.getMonth() + 1) + '' + Utils.padNum(d.date.getDate())
                            };
                        })
                    };
                })
                .entries(D3.values(rows[0]))
                .map(function(d) {
                    return d.value;
                });

            var chartInfo = D3.values(rows[1])[0];

            var data = {
                'metric': chartInfo.metric,
                'metric_label': chartInfo.metric_label,
                'comparison': comparison,
                'comparison_label': comparison,
                'x_label': chartInfo.x_label,
                'y_label': chartInfo.y_label,
                'chart_type': chartInfo.chart_type,
                'band': (chartInfo.band===1 ? true : false),
                'chart_data': chart_data
            }
            console.log(JSON.stringify(data))
            reply(data);

        });

        

    }
};
