'use strict';

import React from 'react';
import MG from 'metrics-graphics';

const PerformanceChart =  React.createClass({

    componentDidMount() {

        MG.data_graphic({
            title: 'Missing Data',
            description: 'This is an example of a graphic whose data is currently missing. Weve also set the error option, which appends an error icon to the title and logs an error to the browsers console.',
            error: 'This data is blocked by Lorem Ipsum. Get your **** together, Ipsum.',
            chart_type: 'missing-data',
            missing_text: 'This is an example of a missing chart',
            target: this.elem,
            width: 600,
            height: 200,
            tooltip:false
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







