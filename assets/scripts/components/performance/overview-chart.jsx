'use strict';

import React from 'react';
import MG from '../../lib/mg';

const D3 = require('d3');
const Parser = require('../../lib/parser');
const Region = require('../../lib/region');

const OverviewChart =  React.createClass({

    loadChart: function(){
        
        var _this = this;
        var data = Region.overview_data(_this.props.config.role, _this.props.activeRegion, _this.props.performance); 
        if(!data){
            return;
        }
        var legend_target = '.region_legend';
        var parsed_data = Parser.lines({
                data: data,
                col: [1, 2, 3, 4, 5, 6, 7],
                isCumulative: true
            });

        MG.data_graphic({
                title: '',
                target: _this.elem,
                left: 100,
                width: 600,
                height: 500,
                full_width: true,
                data: parsed_data,
                chart_type: parsed_data.length !== 0 ? 'line' : 'missing-data',
                missing_text: 'No data',
                transition_on_update: true,
                aggregate_rollover: true,
                show_tooltips: false,
                interplate: 'linear',
                interpolate_tension: .98,
                area: true,
                show_secondary_x_label: false,
                x_extended_ticks: true,
                xax_count: 5,
                xax_format: D3.time.format('%b %Y'),
                decimals: 0,
                baselines: [{
                    value: 15,
                    label: 'Statutory Limit'
                }],
                point_size : 3.5,  
                legend: _this.props.translation.overview.labels,
                legend_target: '.region_legend',  
                y_label:  _this.props.translation.y_axis_label,
                mouseover: function(d, i) {
                    if (!d.values) {
                        d.values = [d];
                        }
                    if (parsed_data.length) {
                        for (i = 1; i <= parsed_data.length; i++) {
                            var l_span = D3.select(legend_target + ' .mg-line' + i + '-legend-color');
                            l_span.text(' ');
                            l_span.text('— ' + _this.props.translation.overview.labels[i - 1]);
                        }
                    }
                    d.values.forEach(function(val, index) {
                        var l_span = D3.select(legend_target + ' .mg-line' + val.line_id + '-legend-color');
                        l_span.text(' ');
                        var no_days = d.values[index - 1] ? (val.value - d.values[index - 1].value).toFixed(0) : (val.value).toFixed(0);
                        l_span.text('— ' + _this.props.translation.overview.labels[val.line_id - 1] + ' : ' + no_days);
                        var format = D3.time.format('%b %Y');
                        D3.select('#region_performance_total_trans').text(format(val.date) + ': ' + val.total_trans);
                    });
                },
                mouseout: function(d, i) {
                    if (!d.values) {
                        d.values = [d];
                    }
                    D3.select('#region_performance_total_trans').text('');
                    d.values.forEach(function(val, index) {
                        var l_span = D3.select(legend_target + ' .mg-line' + val.line_id + '-legend-color');
                        l_span.text(' ');
                        l_span.text('— ' + _this.props.translation.overview.labels[index]);
                    });
                }
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
                <div className="pure-u-6-24">
                    <h2 className="u-mt-larger">{this.props.translation && this.props.translation.overview.title}</h2>
                    <p>
                        {this.props.translation && this.props.translation.overview.description}
                        <span title={this.props.translation && this.props.translation.overview.tooltip} className="pe-7s-info"></span>
                    </p>
                    <div className="legend region_legend"></div>
                    <div>{this.props.translation && this.props.translation.total_trans} <span id="region_performance_total_trans"></span></div>
                </div>
                <div className="pure-u-18-24">
                    <div id="#region_performance" ref={el => {if (el){this.elem = el;}}}></div>
                </div>
            </div>
        ); 
    }
});


export default OverviewChart;







