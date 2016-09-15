'use strict';

import React from 'react';
import MG from '../../lib/mg';

const D3 = require('d3');
const Parser = require('../../lib/parser');
const Region = require('../../lib/region');

const ComparisonChart =  React.createClass({

    getInitialState: function(){
        return {
           active_step: 1,
           active_lines: [],
           comparison_lines:[]
        };
    },
    loadChart: function(){

        var _this = this;    
        var c_data = [];
        var legend_target = '.comparison_legend';
        var labels = [];

        if(!_this.props.activeRegion) {
            return;
        }

        _this.state.active_lines.forEach(function(comparison_line, index) {

            var region = Region.find(_this.props.config.role, _this.props.activeRegion, _this.props.performance, comparison_line);

            labels.push(region[comparison_line + '_name'] + ' ' + _this.props.translation.comparison.labels[comparison_line]);

            var line_data = Parser.lines({
                data: region.data,
                col: [_this.state.active_step],
                isCumulative: false
            });
            if (line_data[0]) {
                c_data.push(line_data[0]); // Workaround to append region data
            }
        });

        MG.data_graphic({
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
                xax_format: D3.time.format('%b %Y'),
                chart_type: c_data.length !== 0 ? 'line' : 'missing-data',
                missing_text: 'No data',
                show_secondary_x_label: false,
                x_extended_ticks: true,
                legend: labels,
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
                            l_span.text('— ' + labels[i - 1]);
                        }
                    }
                    d.values.forEach(function(val, index) {
                        var prefix = D3.formatPrefix(val.value);
                        var l_span = D3.select(legend_target + ' .mg-line' + val.line_id + '-legend-color');
                        l_span.text(' ');
                        l_span.text('— ' + labels[val.line_id - 1] + ' : ' + prefix.scale(val.value).toFixed(0));
                        var format = D3.time.format('%b %Y');
                        D3.select('#region_comparison_total_trans').text( _this.props.translation.comparison.total_trans[_this.props.activeRegion.region_type] + ' '+ format(val.date) + ': ' + val.total_trans);
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
                        l_span.text('— ' + labels[val.line_id - 1]);
                    });
                }
            });

    },
    stepChange: function(event){
        this.setState({
            active_step : event.target.value
        });
        this.loadChart();
    },
    lineChange: function(event){

        var active_compare_lines = [];
        D3.selectAll('.regionSelector').each(function() {
            if (this.checked === true) {
                active_compare_lines.push(this.value);
            }
        });
        this.setState({
            active_lines : active_compare_lines
        });
        this.loadChart();
    },
    componentDidMount: function() {
        this.loadChart();
    },
    componentDidUpdate: function(){
        this.loadChart();
    },
    componentWillReceiveProps: function(nextProps){

        if(!nextProps.activeRegion) {
            return;
        }
        var comparison_lines = nextProps.config.comparison_lines.slice(0);
        comparison_lines.push(nextProps.activeRegion.region_type);
        this.setState({
            comparison_lines : comparison_lines,
            active_lines : comparison_lines
        });
    },
    render: function(){
        var _this = this;
        return (
            <div className="pure-g">
                <div className="pure-u-6-24">
                    <h2 className="u-mt-larger">{this.props.translation && this.props.translation.comparison.title}</h2>
                    <p>
                      {this.props.translation && this.props.translation.comparison.description}
                      <span title={this.props.translation && this.props.translation.comparison.tooltip} className="pe-7s-info"></span>
                    </p>
                    <select onChange={this.stepChange} className="button button--pc" name="" id="modify-step-controls">
                        <option value="1">{this.props.translation && this.props.translation.overview.labels[0]}</option>
                        <option value="2">{this.props.translation && this.props.translation.overview.labels[1]}</option>
                        <option value="3">{this.props.translation && this.props.translation.overview.labels[2]}</option>
                        <option value="4">{this.props.translation && this.props.translation.overview.labels[3]}</option>
                        <option value="5">{this.props.translation && this.props.translation.overview.labels[4]}</option>
                        <option value="6">{this.props.translation && this.props.translation.overview.labels[5]}</option>
                        <option value="7">{this.props.translation && this.props.translation.overview.labels[6]}</option>
                    </select>
                    <div id="compareRegion" className="group-selector">
                        {
                            this.state.comparison_lines.map(function(line, i) {

                                var region = Region.find(_this.props.config.role, _this.props.activeRegion, _this.props.performance, line);
                                var label = region[line + '_name'] + ' ' + _this.props.translation.comparison.labels[line];
                                var selected = _this.state.active_lines.indexOf(line) !== -1; 
                                return (
                                    <div key={line}>
                                        <label htmlFor={'option-'+ line} className="pure-checkbox">
                                            <input id={'option-' + line} className="regionSelector" onChange={_this.lineChange} type="checkbox" value={line} checked={selected}/> {label}
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="legend comparison_legend"></div>
                    <div><span id="region_comparison_total_trans"></span></div>
                </div>
                <div className="pure-u-18-24">
                    <div id="region_comparison" ref={el => {if (el){this.elem = el;}}}></div>
                </div>
            </div>
        ); 
    }
});


export default ComparisonChart;







