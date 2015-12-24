'use strict';

var d3 = require('d3');
var MG = require('../components/metricsgraphics');

exports.large = function(options, paydash) {

    MG.data_graphic({
        // title: options.title,
        title: '',
        data: options.data,
        width: 600,
        height: 500,
        left: 100,
        full_width: true,
        decimals: 0,
        target: options.target,
        baselines: [{
            value: 15,
            label: 'Days permitted'
        }],
        xax_count: 15,
        xax_format: d3.time.format('%e %b, %y'),
        chart_type: options.data.length !== 0 ? 'line' : 'missing-data',
        missing_text: 'No data',
        show_secondary_x_label: false,
        legend: options.labels,
        legend_target: options.legend_target,
        show_tooltips: false,
        aggregate_rollover: true,
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
                    var l_span = d3.select(options.legend_target + ' .mg-line' + i + '-legend-color');
                    l_span.text(' ');
                    l_span.text('— ' + paydash[options.legend_labels][i - 1]);
                }
            }
            d.values.forEach(function(val, index) {
                // var prefix = d3.formatPrefix(val.value);
                var l_span = d3.select(options.legend_target + ' .mg-line' + val.line_id + '-legend-color');
                l_span.text(' ');
                var no_days = d.values[index - 1] ? (val.value - d.values[index - 1].value).toFixed(0) : (val.value).toFixed(0);

                l_span.text('— ' + paydash[options.legend_labels][val.line_id - 1] + ' : ' + no_days);
                var format = d3.time.format('%b %d, %Y');
                d3.select(options.target + '_total_trans').text(format(val.date) + ': ' + val.total_trans);
            });
        },
        mouseout: function(d, i) {
            if (!d.values) {
                d.values = [d];
            }
            d.values.forEach(function(val, index) {
                var l_span = d3.select(options.legend_target + ' .mg-line' + val.line_id + '-legend-color');
                l_span.text(' ');
                l_span.text('— ' + paydash[options.legend_labels][index]);
            });
        }
    });
};


exports.small = function(options, paydash) {
    MG.data_graphic({
        title: options.title,
        data: options.data,
        width: 295,
        height: 300,
        right: 10,
        left: 90,
        small_text: true,
        xax_count: 3,
        decimals: 0,
        xax_format: d3.time.format('%e %b, %y'),
        chart_type: options.data.length !== 0 ? 'line' : 'missing-data',
        missing_text: 'No data',
        target: options.target,
        legend: options.labels,
        legend_target: options.legend_target,
        full_width: true,
        aggregate_rollover: true,
        transition_on_update: false,
        max_y: options.max_y || undefined,
        interplate: 'linear',
        linked: true,
        interpolate_tension: 1,
        y_label: 'Days to Complete Process',
        area: options.area,
        show_secondary_x_label: false,
        max_x: options.max_x || undefined,
        min_x: options.min_x || undefined
    });
};

exports.large_indi = function(options, paydash) {

    MG.data_graphic({
        // title: options.title,
        title: '',
        data: options.data,
        width: 600,
        height: 500,
        left: 100,
        full_width: true,
        decimals: 0,
        target: options.target,
        xax_count: 15,
        xax_format: d3.time.format('%e %b, %y'),
        chart_type: options.data.length !== 0 ? 'line' : 'missing-data',
        missing_text: 'No data',
        show_secondary_x_label : false,
        legend: options.labels,
        legend_target: options.legend_target,
        show_tooltips: false,
        aggregate_rollover: true,
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
            if(options.data.length){
                for(i=1; i<=options.data.length;i++){
                    var l_span = d3.select(options.legend_target + ' .mg-line' + i + '-legend-color');
                    l_span.text(' '); 
                    l_span.text('— ' + paydash[options.legend_labels][i - 1]);
                }
            }
            d.values.forEach(function(val, index) {
                var prefix = d3.formatPrefix(val.value);
                var l_span = d3.select(options.legend_target + ' .mg-line' + val.line_id + '-legend-color');
                l_span.text(' ');
                l_span.text('— ' + paydash[options.legend_labels][val.line_id - 1] + ' : ' + prefix.scale(val.value).toFixed(0));
                var format = d3.time.format('%b %d, %Y');
                d3.select(options.target + '_total_trans').text(format(val.date) + ': ' + val.total_trans);
            });
        },
        mouseout: function(d, i) {
            if (!d.values) {
                d.values = [d];
            }
            d.values.forEach(function(val, index) {
                var l_span = d3.select(options.legend_target + ' .mg-line' + val.line_id + '-legend-color');
                l_span.text(' ');
                l_span.text('— ' + paydash[options.legend_labels][val.line_id - 1]);
            });
        }
    });
};
