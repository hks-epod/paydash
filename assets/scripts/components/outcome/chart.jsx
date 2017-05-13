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
        MG.data_graphic({
            title: '',
            target: _this.elem,
            data: chart_data.data,
            width: 600,
            height: 500,
            left: 100,
            x_accessor: 'x_val',
            y_accessor: 'y_val',
            full_width: true,
            missing_text: 'No data',
            show_secondary_x_label: false,
            x_extended_ticks: true,
            legend: chart_data.labels,
            interpolate: D3.curveLinear,
            legend_target: legend_target,
            // y_label: data.y_label,
            show_tooltips: false,
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
