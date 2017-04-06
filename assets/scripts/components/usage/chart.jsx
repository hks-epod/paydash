'use strict';

import React from 'react';
import MG from '../../lib/mg';

const D3 = require('d3');
const Parser = require('../../lib/parser');

const OverviewChart =  React.createClass({

    loadChart: function(){

        var _this = this;
        var data = _this.props.data;
        var legend_target = '.comparison_legend';
        var labels = [];

        if(!data.metric) {
            return;
        }

        console.log(data.chart_data[0].line_data);

        MG.data_graphic({
                title: data.metric_label,
                target: _this.elem,
                data: data.chart_data[0].line_data,
                width: 600,
                height: 900,
                left: 100,
                full_width: true,
                decimals: 0,
                xax_count: 10,
                xax_format: D3.time.format('%b %Y'),
                chart_type: data.chart_type,
                missing_text: 'No data',
                show_secondary_x_label: false,
                x_extended_ticks: true,
                legend: labels,
                legend_target: '.comparison_legend',
                show_tooltips: false,
                aggregate_rollover: true,
                show_year_markers: true,
                point_size : 3.5,
                x_accessor:'x_var', 
                y_accessor:'y_var', 
                transition_on_update: true,
                interplate: 'linear',
                interpolate_tension: 1,
                area: false,
                y_label: data.y_label,
                show_rollover_text: false
            });

    },
    componentDidMount: function() {
        this.loadChart();
    },
    componentDidUpdate: function(){
        this.loadChart();
    },
    render: function(){
        return (
            <div className="pure-g">
                <div className="pure-u-24-24">
                    <div id="usage_performance" ref={el => {if (el){this.elem = el;}}}></div>
                    <div id="usage_performance_legend"></div>
                </div>
            </div>
        ); 
    }
});


export default OverviewChart;







