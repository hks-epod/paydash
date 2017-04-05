'use strict';

import React from 'react';
import MG from '../../lib/mg';

const D3 = require('d3');
const Parser = require('../../lib/parser');

const OverviewChart =  React.createClass({

    loadChart: function(){

        console.log(this.props.data);

        var _this = this;
        MG.data_graphic({
            title: 'Singleton',
            description: 'Handling a solitary data point.',
            data: [{'date': new Date('2015-03-05T21:00:00Z'), 'value': 12000}],
            width: 600,
            height: 200,
            right: 40,
            show_tooltips: false,
            target: _this.elem
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
                    <div id="#usage_performance" ref={el => {if (el){this.elem = el;}}}></div>
                </div>
            </div>
        ); 
    }
});


export default OverviewChart;







