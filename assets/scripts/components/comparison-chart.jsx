'use strict';

import React from 'react';
import MG from '../lib/mg';

const D3 = require('d3');
const Parser = require('../lib/parser');

const ComparisonChart =  React.createClass({

    loadChart: function(){

        var _this = this;    
        var c_data = [];
        var legend_target = '.comparison_legend';

        if(!_this.props.activeRegion) {
            return;
        }

        var comparison_lines = ['state', 'district'];
        
        comparison_lines.forEach(function(comparison_line, index) {
            var line_data = Parser.lines({
                data: _this.props.performance[comparison_line].data,
                col: [1,2,3,4,5,6,7],
                isCumulative: false
            });
            if (line_data[0]) {
                c_data.push(line_data[0]); // Workaround to append region data
            }
        });

        MG.data_graphic({
                // title: options.title,
                title: '',
                target: _this.elem,
                data: c_data,
                width: 600,
                height: 500,
                left: 100,
                full_width: true,
                decimals: 0,
                xax_count: 10,
                // max_x : options.max_x || null,
                // min_x: options.min_x || null,
                xax_format: D3.time.format('%b, %y'),
                chart_type: c_data.length !== 0 ? 'line' : 'missing-data',
                missing_text: 'No data',
                show_secondary_x_label: false,
                x_extended_ticks: true,
                legend: _this.props.config.labels,
                legend_target: '.comparison_legend',
                show_tooltips: false,
                aggregate_rollover: true,
                show_year_markers: true,
                point_size : 3.5,
                transition_on_update: true,
                interplate: 'linear',
                interpolate_tension: 1,
                area: false,
                y_label: _this.props.config.y_axis_label,
                show_rollover_text: false,
                mouseover: function(d, i) {
                    if (!d.values) {
                        d.values = [d];
                    }
                    if (c_data.length) {
                        for (i = 1; i <= c_data.length; i++) {
                            var l_span = D3.select(legend_target + ' .mg-line' + i + '-legend-color');
                            l_span.text(' ');
                            l_span.text('— ' +_this.props.config.labels[i - 1]);
                        }
                    }
                    d.values.forEach(function(val, index) {
                        var prefix = D3.formatPrefix(val.value);
                        var l_span = D3.select(legend_target + ' .mg-line' + val.line_id + '-legend-color');
                        l_span.text(' ');
                        l_span.text('— ' +_this.props.config.labels[val.line_id - 1] + ' : ' + prefix.scale(val.value).toFixed(0));
                        var format = D3.time.format('%b, %Y');
                        D3.select('#region_comparison_total_trans').text(format(val.date) + ': ' + val.total_trans);
                    });
                },
                mouseout: function(d, i) {
                    if (!d.values) {
                        d.values = [d];
                    }
                    D3.select('#region_comparison_total_trans').text('');
                    d.values.forEach(function(val, index) {
                        var l_span = D3.select(legend_target + ' .mg-line' + val.line_id + '-legend-color');
                        l_span.text(' ');
                        l_span.text('— ' +_this.props.config.labels[val.line_id - 1]);
                    });
                }
            });

    },
    stepChange: function(event){
        console.log(event.target.value);
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
                    <h2 className="u-mt-larger">Benchmarking Your Performance</h2>
                    <p>
                      Compare your performance with averages for your district and state. 
                      <span title="help text" className="pe-7s-info"></span>
                    </p>
                    <select onChange={this.stepChange} className="button button--pc" name="" id="modify-step-controls">
                        <option value="1">1</option>
                        <option value="2">1</option>
                        <option value="3">1</option>
                        <option value="4">1</option>
                        <option value="5">1</option>
                        <option value="6">1</option>
                        <option value="7">1</option>
                    </select>
                    <div id="compareRegion" className="group-selector">
                        <div><label htmlFor="option-01" className="pure-checkbox"><input className="regionSelector" id="option-01" type="checkbox" value="block" checked=""/> AMARPATAN block average</label></div>
                        <div><label htmlFor="option-11" className="pure-checkbox"><input className="regionSelector" id="option-11" type="checkbox" value="district" checked=""/> SATNA district average</label></div>
                        <div><label htmlFor="option-21" className="pure-checkbox"><input className="regionSelector" id="option-21" type="checkbox" value="state" checked=""/> MADHYA PRADESH state average</label></div>
                    </div>
                    <div className="legend comparison_legend"></div>
                    <div>Total transactions on <span id="region_comparison_total_trans"></span></div>
                </div>
                <div className="pure-u-18-24">
                    <div id="region_comparison" ref={el => {if (el){this.elem = el;}}}></div>
                </div>
            </div>
        ); 
    }
});


export default ComparisonChart;







