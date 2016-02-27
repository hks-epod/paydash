'use strict';

var D3 = require('d3');
var MG = require('./metricsgraphics');

exports.flash = function(options, paydash) {
    MG.data_graphic({
        title: '',
        data: options.data,
        target: options.target,
        width: 600,
        height: 500,
        left: 100,
        full_width: true,
        decimals: 0,
        baselines: [{
            value: 15,
            label: 'Statutory Limit'
        }],
        xax_count: 10,
        xax_format: D3.time.format('%e %b, %y'),
        show_secondary_x_label: false,
        chart_type: options.data.length !== 0 ? 'line' : 'missing-data',
        missing_text: 'No data',
        legend: options.labels,
        legend_target: options.legend_target,
        aggregate_rollover: true,
        show_tooltips: false,
        show_year_markers: true,
        transition_on_update: false,
        interplate: 'linear',
        interpolate_tension: 1,
        area: options.area,
        y_label: 'Days to Complete Process',
        mouseover: function(d, i) {
            if (!d.values) {
                d.values = [d];
            }
            if (options.data.length) {
                for (i = 1; i <= options.data.length; i++) {
                    var l_span = D3.select(options.legend_target + ' .mg-line' + i + '-legend-color');
                    l_span.text(' ');
                    l_span.text('— ' + paydash[options.legend_labels][i - 1]);
                }
            }
            d.values.forEach(function(val, index) {
                // var prefix = D3.formatPrefix(val.value);
                var l_span = D3.select(options.legend_target + ' .mg-line' + val.line_id + '-legend-color');
                l_span.text(' ');
                var no_days = d.values[index - 1] ? (val.value - d.values[index - 1].value).toFixed(0) : (val.value).toFixed(0);

                l_span.text('— ' + paydash[options.legend_labels][val.line_id - 1] + ' : ' + no_days);
                var format = D3.time.format('%b %d, %Y');
                D3.select(options.target + '_total_trans').text(format(val.date) + ': ' + val.total_trans);
            });
        },
        mouseout: function(d, i) {
            if (!d.values) {
                d.values = [d];
            }
            d.values.forEach(function(val, index) {
                var l_span = D3.select(options.legend_target + ' .mg-line' + val.line_id + '-legend-color');
                l_span.text(' ');
                l_span.text('— ' + paydash[options.legend_labels][index]);
            });
        }
    });
};
