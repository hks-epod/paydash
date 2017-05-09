'use strict';
const Queries = require('../../helpers/queries');
const D3 = require('d3');

exports.showPage = {
    auth: {
        scope: ['monitoring']
    },
    handler: function(request, reply) {
        return reply.view('monitor/outcome', null, { layout: 'monitor' });
    }
};

exports.getData = {
    auth: {
        scope: ['monitoring']
    },
    handler: function(request, reply) {
        var sequelize = request.server.plugins.sequelize.db.sequelize;

        var queryString =
            'SELECT b.treatment_label, b.treatment, a.period, a.b, a.ci_u, a.ci_l, a.outcome FROM estimates_series a left join (SELECT DISTINCT treatment, treatment_label FROM treatment) b ON a.treat_arm=b.treatment inner join (SELECT * FROM outcomes WHERE `type`="payments") c ON a.outcome=c.outcome;SELECT * FROM outcomes WHERE `type`="payments";SELECT b.treatment_label, a.val_type, a.mrc_mre, a.mre_wlg, a.wlg_wls, a.wls_fto, a.fto_sn1, a.sn1_sn2, a.sn2_prc, a.mrc_prc FROM estimates_summary a left join (SELECT DISTINCT treatment, treatment_label FROM treatment) b ON a.treat_arm=b.treatment;';

        // var queryString = Queries.estimates(step);

        // API CODE
        sequelize
            .query(queryString, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(function(rows) {
                var outcomes = D3.values(rows[1]).map(function(d) {
                    return {
                        value: d.outcome,
                        label: d.label
                    };
                });

                var estimates_series = D3.nest()
                    .key(function(d) {
                        return d.outcome;
                    })
                    .key(function(d) {
                        return d.treatment;
                    })
                    .rollup(function(v) {
                        return {
                            line_label: v[0].treatment_label,
                            line_data: v.map(function(d) {
                                return {
                                    x_val: d.period,
                                    y_val: d.b,
                                    y_upper: d.ci_u,
                                    y_lower: d.ci_l
                                };
                            })
                        };
                    })
                    .object(D3.values(rows[0]))

                Object.keys(estimates_series).forEach(function (d) { // need to convert the inner objects into arrays
                	estimates_series[d] = D3.values(estimates_series[d]);
                })


                var format = D3.format('.4f');
                var table_data = D3.values(rows[2]);
                table_data.forEach(function(d, i) {
                    if (d.val_type === 'b') {
                        outcomes.forEach(function(e, j) {
                            if (table_data[i + 1][e.value] < 0.01) {
                                d[e.value] = format(d[e.value]) + '***';
                            } else if (
                                table_data[i + 1][e.value] >= 0.01 &&
                                table_data[i + 1][e.value] < 0.05
                            ) {
                                d[e.value] = format(d[e.value]) + '**';
                            } else if (
                                table_data[i + 1][e.value] >= 0.05 &&
                                table_data[i + 1][e.value] < 0.1
                            ) {
                                d[e.value] = format(d[e.value]) + '*';
                            } else {
                                d[e.value] = format(d[e.value]);
                            }
                        });
                    } else if (d.val_type === 'p') {
                        outcomes.forEach(function(e, j) {
                            d[e.value] = '(' + format(d[e.value]) + ')';
                        });

                        d.treatment_label = '';
                    }
                });

                var estimates_summary = [
                    ['', '(1)', '(2)', '(3)', '(4)', '(5)', '(6)', '(7)', '(8)'],
                    [
                        '',
                        'mrc_mre',
                        'mre_wlg',
                        'wlg_wls',
                        'wls_fto',
                        'fto_sn1',
                        'sn1_sn2',
                        'sn2_prc',
                        'mrc_prc (all)'
                    ]
                ].concat(
                    table_data.map(function(d) {
                        return [
                            d.treatment_label,
                            d.mrc_mre,
                            d.mre_wlg,
                            d.wlg_wls,
                            d.wls_fto,
                            d.fto_sn1,
                            d.sn1_sn2,
                            d.sn2_prc,
                            d.mrc_prc
                        ];
                    })
                );

                var data = {
                    chart_menu: outcomes,
                    chart: estimates_series,
                    table: estimates_summary
                };

                reply(data);
            });
    }
};
