'use strict';

const Queries = require('../../helpers/queries');
const D3 = require('d3');
const Joi = require('joi');
const Utils = require('../../helpers/utils');

exports.showPage = {
    auth: {
      scope : ['monitoring']
    },
    handler: function(request, reply) {
        return reply.view('monitor/usage', null, { layout: 'monitor' });
    }
};

exports.metric = {
    auth: {
      scope : ['monitoring']
    },
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
    auth: {
      scope : ['monitoring']
    },
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

        // Use the filter data to construct the conditional clause for the query
        var filter_types = Object.keys(filter).filter(function(d) { return filter[d]!==null; });
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
            var compTextAlias = '';
            var compTextAs = ',"overall" AS comparison';
            var joinText = '';
            var groupbyText = '';
        }
        else {
            var compText = ','+comparison;
            var compTextAlias = ',a.'+comparison;
            var compTextAs = compText+' AS comparison';
            var joinText = ' AND a.'+comparison+'=b.'+comparison;
            var groupbyText = 'GROUP BY '+comparison + ' ';    
        }

        var queryTemplates = {
            'usage_overview':'SELECT AVG(IF(session_sum=0,1,0)) AS bar_value, "No sessions" AS bar_label'+compTextAs+' FROM (SELECT SUM(session_flag) as session_sum, user_id'+compText+' FROM (SELECT IF(session_count>0,1,0) as session_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+'UNION SELECT AVG(IF(day7_sum>0,1,0)) AS bar_value, "Session in past 7 days" AS bar_label'+compTextAs+' FROM (SELECT SUM(day7_flag) as day7_sum, user_id'+compText+' FROM (SELECT IF((date >= DATE(NOW()) - INTERVAL 8 DAY) AND session_count>0,1,0) AS day7_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+'UNION SELECT AVG(IF(day3_sum>0,1,0)) AS bar_value, "Session in past 3 days" AS bar_label'+compTextAs+' FROM (SELECT SUM(day3_flag) as day3_sum, user_id'+compText+' FROM (SELECT IF((date >= DATE(NOW()) - INTERVAL 4 DAY) AND session_count>0,1,0) AS day3_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+';',
            'users_1session_date':'SELECT a.session_flag_count/a.user_count AS value, date'+compTextAs+' FROM (SELECT SUM(session_flag) as session_flag_count, COUNT(DISTINCT user_id) as user_count, date'+compText+' FROM (SELECT IF(session_count>0,1,0) as session_flag, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b GROUP BY date'+compText+') a;',
            'users_1session_day':'SELECT a.session_flag_count/a.user_count AS value, day_of_intervention'+compTextAs+' FROM (SELECT SUM(session_flag) as session_flag_count, COUNT(DISTINCT user_id) as user_count, day_of_intervention'+compText+' FROM (SELECT IF(session_count>0,1,0) as session_flag, DATEDIFF(date,rollout_date) AS day_of_intervention, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,day_of_intervention'+compText+') b GROUP BY day_of_intervention'+compText+') a;',
            'total_users':'SELECT COUNT(DISTINCT user_id) as value, date'+compTextAs+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+';',
            'sessions_per_user':'SELECT a.session_total/a.user_count AS value, date'+compTextAs+' FROM (SELECT SUM(session_count) as session_total, COUNT(DISTINCT user_id) as user_count, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+') a;',
            'session_duration':'SELECT AVG(a.avg_session_duration) AS value, a.date'+compTextAs+' FROM (SELECT SUM(session_duration)/SUM(session_count) AS avg_session_duration,user_id,date'+compText+' FROM ga_sessions WHERE session_count>0 '+whereClause.replace('WHERE','AND')+'GROUP BY user_id,date'+compText+') a GROUP BY date'+compText+';',
            'chart_duration':'SELECT AVG(c.time_per_session) AS value, date'+compTextAs+' FROM (SELECT a.view_duration/b.session_count AS time_per_session,a.user_id, a.date'+compTextAlias+' FROM (SELECT SUM(view_duration) as view_duration, date, user_id'+compText+' FROM ga_chart_views '+whereClause+'GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';',
            'chart_views_per_session':'SELECT AVG(c.views_per_session) AS value, date'+compTextAs+' FROM (SELECT a.view_count/b.session_count AS views_per_session, a.user_id, a.date'+compTextAlias+' FROM (SELECT SUM(view_count) as view_count, date, user_id'+compText+' FROM ga_chart_views '+whereClause+'GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';',
            'cards_per_session_mobile':'SELECT AVG(c.cards_per_session) AS value, date'+compTextAs+' FROM (SELECT a.view_count/b.session_count AS cards_per_session,a.user_id, a.date'+compTextAlias+' FROM (SELECT SUM(z.view_count) as view_count, z.date, z.user_id'+compText+' FROM (SELECT view_count, date, user_id'+compText+' FROM ga_block_card_views_mobile '+whereClause+'UNION SELECT view_count, date, user_id'+compText+' FROM ga_district_card_views_mobile '+whereClause+') z GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';',
            'calls_per_session':'SELECT AVG(c.calls_per_session) AS value, date'+compTextAs+' FROM (SELECT a.call_count/b.session_count AS calls_per_session,a.user_id, a.date'+compTextAlias+' FROM (SELECT SUM(z.call_count) as call_count, z.date, z.user_id'+compText+' FROM (SELECT call_count, date, user_id'+compText+' FROM ga_block_calls '+whereClause+'UNION SELECT call_count, date, user_id'+compText+' FROM ga_district_calls '+whereClause+') z GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';',
            'call_duration':'SELECT AVG(a.avg_call_duration) AS value, a.date'+compTextAs+' FROM (SELECT SUM(z.call_duration)/SUM(z.call_count) AS avg_call_duration,user_id,date'+compText+' FROM (SELECT call_count, call_duration, date, user_id'+compText+' FROM ga_block_calls '+whereClause+'UNION SELECT call_count, call_duration, date, user_id'+compText+' FROM ga_district_calls '+whereClause+') z WHERE call_count>0 GROUP BY user_id,date'+compText+') a GROUP BY date'+compText+';',
            'whatsapp_per_session':'SELECT AVG(c.whatsapp_per_session) AS value, date'+compTextAs+' FROM (SELECT a.message_count/b.session_count AS whatsapp_per_session,a.user_id, a.date'+compTextAlias+' FROM (SELECT SUM(z.message_count) as message_count, z.date, z.user_id'+compText+' FROM (SELECT message_count, date, user_id'+compText+' FROM ga_block_whatsapp_contacts '+whereClause+'UNION SELECT message_count, date, user_id'+compText+' FROM ga_district_whatsapp_contacts '+whereClause+') z GROUP BY user_id,date'+compText+') a LEFT JOIN (SELECT SUM(session_count) as session_count, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b ON a.date = b.date AND a.user_id = b.user_id'+joinText+') c GROUP BY c.date'+compText+';'
        };


// SELECT a.session_flag_count/a.user_count AS value, date'+compTextAs+' 
//     FROM (
//         SELECT 
//         SUM(session_flag) as session_flag_count, 
//         COUNT(DISTINCT user_id) as user_count, 
//         date'+compText+' 
//         FROM (SELECT IF(session_count>0,1,0) as session_flag, date, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,date'+compText+') b
//         GROUP BY date'+compText+'
//     ) a;


// SELECT a.session_flag_count/a.user_count AS value, day_of_intervention'+compTextAs+' 
//     FROM (
//         SELECT 
//         SUM(session_flag) as session_flag_count, 
//         COUNT(DISTINCT user_id) as user_count, 
//         day_of_intervention'+compText+' 
//         FROM (SELECT IF(session_count>0,1,0) as session_flag, DATEDIFF(date,rollout_date) AS day_of_intervention, user_id'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id,day_of_intervention'+compText+') b
//         GROUP BY day_of_intervention'+compText+'
//     ) a;


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

        //SUBSTRING_INDEX(SUBSTRING_INDEX(GROUP_CONCAT(c.whatsapp_per_session ORDER BY c.whatsapp_per_session SEPARATOR ","),",", 25/100 * COUNT(*) + 1), ",", -1) AS lower, SUBSTRING_INDEX(SUBSTRING_INDEX(GROUP_CONCAT(c.whatsapp_per_session ORDER BY c.whatsapp_per_session SEPARATOR ","),",", 75/100 * COUNT(*) + 1), ",", -1) AS upper,

        // 'SELECT AVG(IF(session_sum=0,1,0)) AS bar_value, 'No sessions' AS bar_label'+compTextAs+' FROM (SELECT SUM(session_flag) as session_sum, user_id'+compText+' FROM (SELECT IF(session_count>0,1,0) as session_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+'UNION SELECT AVG(IF(day7_sum>0,1,0)) AS bar_value, 'Session in past 7 days' AS bar_label'+compTextAs+' FROM (SELECT SUM(day7_flag) as day7_sum, user_id'+compText+' FROM (SELECT IF((date >= DATE(NOW()) - INTERVAL 8 DAY) AND session_count>0,1,0) AS day7_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+'UNION SELECT AVG(IF(day3_sum>0,1,0)) AS bar_value, 'Session in past 3 days' AS bar_label'+compTextAs+' FROM (SELECT SUM(day3_flag) as day3_sum, user_id'+compText+' FROM (SELECT IF((date >= DATE(NOW()) - INTERVAL 4 DAY) AND session_count>0,1,0) AS day3_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+';'

        // SELECT AVG(IF(session_sum=0,1,0)) AS bar_value, 'No sessions' AS bar_label'+compTextAs+' FROM (SELECT SUM(session_flag) as session_sum, user_id'+compText+' FROM (SELECT IF(session_count>0,1,0) as session_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+'
        // UNION SELECT AVG(IF(day7_sum>0,1,0)) AS bar_value, 'Session in past 7 days' AS bar_label'+compTextAs+' FROM (SELECT SUM(day7_flag) as day7_sum, user_id'+compText+' FROM (SELECT IF((date >= DATE(NOW()) - INTERVAL 8 DAY) AND session_count>0,1,0) AS day7_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+'
        // UNION SELECT AVG(IF(day3_sum>0,1,0)) AS bar_value, 'Session in past 3 days' AS bar_label'+compTextAs+' FROM (SELECT SUM(day3_flag) as day3_sum, user_id'+compText+' FROM (SELECT IF((date >= DATE(NOW()) - INTERVAL 4 DAY) AND session_count>0,1,0) AS day3_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b '+groupbyText+';
        
        // 'users_1session_date'
        // 'users_1session_day'
        // 'total_users'
        // 'sessions_per_user'
        // 'session_duration'

        // SELECT AVG(IF(session_sum=0,1,0)) AS no_sessions, AVG(IF(day7_sum>0,1,0)) AS day7_session, AVG(IF(day3_sum>0,1,0)) AS day3_session'+compTextAs+' FROM (SELECT SUM(session_flag) as session_sum, SUM(day7_flag) as day7_sum, SUM(day3_flag) as day3_sum, COUNT(distinct date) as date_count, user_id FROM (SELECT IF(session_count>0,1,0) as session_flag, IF((date >= DATE(NOW()) - INTERVAL 8 DAY) AND session_count>0,1,0) AS day7_flag, IF((date >= DATE(NOW()) - INTERVAL 4 DAY) AND session_count>0,1,0) AS day3_flag, user_id, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY user_id, date'+compText+') a GROUP BY user_id'+compText+') b;

        var queryString = queryTemplates[metric] + "SELECT distinct metric,metric_label,chart_type,band,x_label,y_label FROM usage_metrics WHERE metric='"+metric+"'; SELECT `option`, `option_label` FROM usage_comparisons WHERE comparison='"+comparison+"';";

        console.log(queryString);
        // // usage_overview
        // 'SELECT 'COUNT(DISTINCT date) as day_count,
        // 'SELECT b.session_flag_count/b.day_count AS value FROM (SELECT IF(SUM(a.session_flag)/COUNT(DISTINCT a.date)=1,1,0) AS daily_user, IF(SUM(a.session_flag)/COUNT(DISTINCT a.date)=1,1,0) AS daily_user, a.user_id FROM (SELECT IF(session_count>0,1,0) as session_flag, user_id, date FROM ga_sessions GROUP BY user_id, date) a GROUP BY user_id) b;'
        // 'SELECT a.session_flag_count/a.user_count AS value, date'+compText+' FROM (SELECT SUM(IF(session_count>0,1,0)) as session_flag_count, COUNT(DISTINCT user_id) as user_count, date'+compText+' FROM ga_sessions '+whereClause+'GROUP BY date'+compText+') a;'


        // API CODE
        sequelize.query(queryString, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(rows) {

            console.log(D3.values(rows[0]))
            var chartInfo = D3.values(rows[1])[0];

            var comparisonInfo = D3.values(rows[2]);
            var comparisonLookup = {};
            comparisonInfo.forEach(function(d) {
                comparisonLookup[d.option] = d.option_label;
            });
            if (comparison==='overall') {
                comparisonLookup['overall'] = 'Overall';
            }

            if (chartInfo.chart_type==='line') {
                var chart_data = D3.nest()
                    .key(function(d) {
                        return d.comparison;
                    })
                    .rollup(function(v) {
                        return {
                            'option': v[0].comparison,
                            'option_label': comparisonLookup[v[0].comparison],
                            'line_data': v.filter(function(d) { return d.value!==null; }).map(function(d) {
                                return {
                                    'y_val': d.value,
                                    'x_val': d.day_of_intervention || d.date.getFullYear() + '' + Utils.padNum(d.date.getMonth() + 1) + '' + Utils.padNum(d.date.getDate())
                                }; 
                            })
                        };
                    })
                    .entries(D3.values(rows[0]))
                    .map(function(d) {
                        return d.value;
                    });
            }

            else if (chartInfo.chart_type==='bar') {
                console.log(rows[0]);
                var chart_data = D3.nest()
                    .key(function(d) {
                        return d.comparison;
                    })
                    .rollup(function(v) {
                        return {
                            'option': v[0].comparison,
                            'option_label': comparisonLookup[v[0].comparison],
                            'bar_data': v.map(function(d) {
                                return {
                                    'bar_label': d.bar_label,
                                    'bar_value': d.bar_value
                                };
                            })
                        };
                    })
                    .entries(D3.values(rows[0]))
                    .map(function(d) {
                        return d.value;
                    });
            };

            var data = {
                'metric': chartInfo.metric,
                'metric_label': chartInfo.metric_label,
                'comparison': comparison,
                'comparison_label': comparison,
                'x_label': chartInfo.x_label,
                'y_label': chartInfo.y_label,
                'chart_type': chartInfo.chart_type,
                'band': (chartInfo.band===1 ? true : false),
                'area': (comparison==='overall' ? true : false),
                'chart_data': chart_data
            }
            console.log(JSON.stringify(data))
            reply(data);

        });

        

    }
};
