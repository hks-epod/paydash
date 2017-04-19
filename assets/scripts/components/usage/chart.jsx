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

const UsageChart =  React.createClass({

    loadChart: function(){

        var _this = this;
        var data = _this.props.data;
        var legend_target = '#usage_performance_legend';

        if(!data.metric) {
            return;
        }

        if(data.chart_type === 'line' && data.x_label === 'Date' ){

            var chart_data = Parser.usage(data.chart_data, data.x_label); 

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
                // xax_count: 10,
                xax_format: D3.timeFormat('%d %b %Y'),
                chart_type: data.chart_type,
                missing_text: 'No data',
                show_secondary_x_label: false,
                x_extended_ticks: true,
                legend: chart_data.labels,
                interpolate: D3.curveLinear,
                legend_target: legend_target,
                y_label: data.y_label,
                show_rollover_text: true,
                aggregate_rollover: true,
                show_tooltips: false,
                show_year_markers: true,
                point_size : 3.5,
                transition_on_update: true,
                area: _this.props.data.area
            });    
        } else if (data.chart_type === 'line' && data.x_label !== 'Date'){

            var b_chart_data = Parser.usage(data.chart_data, data.x_label); 

            MG.data_graphic({
                title: '',
                target: _this.elem,
                data: b_chart_data.data,
                width: 600,
                height: 500,
                left: 100,
                x_accessor: 'x_val',
                y_accessor: 'y_val',
                full_width: true,
                bins: 50,
                bar_margin: 0,
                y_extended_ticks: true
            });    


        } else{
            var values = D3.range(10000).map(D3.randomBates(10));

            MG.data_graphic({
                title: '',
                data: _this.props.data.chart_data[0].bar_data,
                chart_type: 'bar',
                width: 600,
                height: 500,
                full_width: true,
                left: 100,
                y_accessor: 'bar_value',
                x_accessor: 'bar_label',
                target: _this.elem
            });
        }
        

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
                    <h2 className="sidebar__heading">{this.props.data.metric_label}</h2>  
                    <div id="usage_performance" ref={el => {if (el){this.elem = el;}}}></div>
                    <div id="usage_performance_legend"></div>
                </div>
            </div>
        ); 
    }
});


export default UsageChart;







