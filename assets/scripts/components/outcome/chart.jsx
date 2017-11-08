'use strict';

import React from 'react';
import MG from 'metrics-graphics';

const D3 = require('d3');
const Parser = require('../../lib/parser');

function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6) - 1;
    var d = string.substring(6, 8);
    return new Date(y, m, d);
}

const UsageChart = React.createClass({
    loadChart: function() {
        var _this = this;
        var data = _this.props.data;
        var legend_target = '#usage_performance_legend';
        if (!_this.state.step) {
            return;
        }
        if (!data.mrc_mre) {
            return;
        }

        var chart_data = Parser.outcome(data[_this.state.step.value]);

        var max_y = D3.max(D3.merge(chart_data.data), function(e) {
            return e.y_upper;
        });
        var min_y = D3.min(D3.merge(chart_data.data), function(e) {
            return e.y_lower;
        });

        MG.data_graphic({
            title: '',
            target: _this.elem,
            data: chart_data.data,
            width: 600,
            height: 450,
            left: 100,
            x_accessor: 'x_val',
            y_accessor: 'y_val',
            max_y: max_y + Math.abs(max_y) * 0.1,
            min_y: min_y - Math.abs(min_y) * 0.1,
            full_width: true,
            missing_text: 'No data',
            show_secondary_x_label: false,
            x_extended_ticks: true,
            legend: chart_data.labels,
            interpolate: D3.curveLinear,
            legend_target: legend_target,
            baselines: [{ value: 0 }],
            mouseover: function(d, i) {
                var bandColor = D3.select('.mg-line' + d.line_id + '-color').style('stroke');
                D3.select('.mg-confidence-band-' + d.line_id)
                    .style('display', 'flex')
                    .style('stroke', bandColor);

                var upperLegendHTML =
                    '<span class="mg-line' +
                    d.line_id +
                    '-legend-color">— ' +
                    chart_data.labels[d.line_id - 1] +
                    '</span> \
                    <br> \
                    <span>Month ' +
                    d.x_val +
                    ' </span> \
                    <br> \
                    <span>&beta; ' +
                    d.y_val +
                    ' </span> \
                    <br> \
                    <span>CI Upper ' +
                    d.y_upper +
                    ' </span> \
                    <br> \
                    <span>CI Lower ' +
                    d.y_lower +
                    ' </span>';

                D3.select('.mg-active-datapoint').text('');

                D3.select('#custom_legend').html(upperLegendHTML);
            },
            mouseout: function(d, i) {
                D3.select('.mg-confidence-band-' + d.line_id).style('display', 'none');
                D3.select('#custom_legend').html('');
            },
            // y_label: data.y_label,
            show_tooltips: true,
            show_confidence_band: ['y_lower', 'y_upper'],
            area: false
        });
    },
    getInitialState: function() {
        return {
            step: this.props.step
        };
    },
    componentDidMount: function() {
        this.loadChart();
    },
    componentDidUpdate: function() {
        this.loadChart();
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ step: nextProps.step });
    },
    render: function() {
        return (
            <div className="pure-g">
                <div className="pure-u-24-24">
                    <div id="custom_legend" />
                    <div
                        id="usage_performance"
                        ref={el => {
                            if (el) {
                                this.elem = el;
                            }
                        }}
                    />
                    <div id="usage_performance_legend" />
                </div>
            </div>
        );
    }
});

export default UsageChart;
