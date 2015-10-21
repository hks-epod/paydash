'use strict';

var d3 = require('d3');
var MG = require('../components/metricsgraphics');

exports.large = function detailViz(options, paydash) {
  
    MG.data_graphic({
        // title: options.title,
        title: '',
        data: options.data,
        width: 600,
        height: 500,
        left: 90,
        full_width: true,
        target: options.target,
        baselines: [{
            value: 15,
            label: 'Ideal'
        }],
        xax_count: 20,
        xax_format: d3.time.format('%b'),
        chart_type: options.data.length !== 0 ? 'line' : 'missing-data',
        missing_text: 'No data',
        legend: options.labels,
        legend_target: options.legend_target,
        show_tooltips: false,
        aggregate_rollover: true,
        show_year_markers: true,
        transition_on_update: false,
        interplate: 'linear',
        interpolate_tension: 1,
        area: true,
        y_label: 'Days to Process',
        mouseover: function(d, i) {
            d.values.forEach(function(val, index) {
                var prefix = d3.formatPrefix(val.value);
                var l_span = d3.select('.legend ' + '.mg-line' + val.line_id + '-legend-color');
                l_span.text(' ');
                l_span.text('— ' + paydash.labels[index] + ' : ' + prefix.scale(val.value).toFixed(2));
                var format = d3.time.format('%b %d, %Y');
                d3.select('#total_trans').text(format(val.date) + ': ' + val.total_trans);
            });
        },
        mouseout: function(d, i) {
            d.values.forEach(function(val, index) {
                var l_span = d3.select('.legend ' + '.mg-line' + val.line_id + '-legend-color');
                l_span.text(' ');
                l_span.text('— ' + paydash.labels[index]);
            });
        }
    });
};
