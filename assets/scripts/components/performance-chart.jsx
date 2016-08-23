'use strict';

import React from 'react';

const PerformanceChart =  React.createClass({

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
                </div>
            </div>
        ); 
    }
});


export default PerformanceChart;







