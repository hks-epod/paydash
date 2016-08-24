'use strict';

import React from 'react';
import MG from 'metrics-graphics';

const D3 = require('d3');
const Parser = require('../lib/parser');

const PerformanceChart =  React.createClass({

    loadChart: function(){

        var data;
        
        if(this.props.activeRegion && this.props.activeRegion.region_type === 'block'){
            data = this.props.performance[this.props.activeRegion.region_type][this.props.activeRegion.block_index].data;
        }
        else if(this.props.activeRegion && this.props.activeRegion.region_type === 'panchayat'){
            data = this.props.performance[this.props.activeRegion.region_type][this.props.activeRegion.block_index].data[this.props.activeRegion.panchayat_index].data;
        }else {
            return;
        }

        var parsed_data = Parser.lines({
                data: data,
                col: [1, 2, 3, 4, 5, 6, 7],
                isCumulative: true
            });

        MG.data_graphic({
                title: '',
                target: this.elem,
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
                xax_format: D3.time.format('%e %b, %y'),
                decimals: 0,
                baselines: [{
                    value: 15,
                    label: 'Statutory Limit'
                }],
                point_size : 3.5,  
                legend: this.props.config.labels,
                legend_target: this.props.config.legend_target,  
                y_label:  this.props.config.y_axis_label,
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
                    <h2 className="u-mt-larger">Your Block's Performance</h2>
                    <p>
                        Average number of days to complete each step of the payment process in your block.
                        <span title="Some help text" className="pe-7s-info"></span>
                    </p>
                    <div className="legend region_legend"></div>
                    <div>Total transactions on <span id="region_performance_total_trans"></span></div>
                </div>
                <div className="pure-u-18-24">
                    <div id="region_performance"></div>
                    <div ref={el => {if (el){this.elem = el;}}}></div>
                </div>
            </div>
        ); 
    }
});


export default PerformanceChart;







