'use strict';

import React from 'react';
import MG from 'metrics-graphics';

const D3 = require('d3');

const PerformanceChart =  React.createClass({

    componentDidMount() {

        MG.data_graphic({
                title: '',
                target: this.elem,
                left: 100,
                width: 600,
                height: 500,
                full_width: true,
                data: this.props.data,
                chart_type: this.props.data.length !== 0 ? 'line' : 'missing-data',
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
                max_x : this.props.options.max_x || null,
                min_x: this.props.options.min_x || null,    
                legend: this.props.options.labels,
                legend_target: this.props.options.legend_target,  
                y_label:  this.props.options.y_axis_label,
            });
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







