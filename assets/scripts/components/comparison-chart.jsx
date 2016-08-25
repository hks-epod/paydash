'use strict';

import React from 'react';
import MG from '../lib/mg';

const D3 = require('d3');
const Parser = require('../lib/parser');

const ComparisonChart =  React.createClass({

    loadChart: function(){

        // var data;
        // var _this = this;
        
        // if(_this.props.activeRegion && _this.props.activeRegion.region_type === 'block'){
        //     data = _this.props.performance[_this.props.activeRegion.region_type][_this.props.activeRegion.block_index].data;
        // }
        // else if(_this.props.activeRegion && _this.props.activeRegion.region_type === 'panchayat'){
        //     data = _this.props.performance[_this.props.activeRegion.region_type][_this.props.activeRegion.block_index].data[_this.props.activeRegion.panchayat_index].data;
        // }else {
        //     return;
        // }

        // var parsed_data = Parser.lines({
        //         data: data,
        //         col: [1, 2, 3, 4, 5, 6, 7],
        //         isCumulative: true
        //     });


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
                    <select className="button button--pc" name="" id="modify-step-controls">
                      <option value="1">1</option>
                      <option value="2">1</option>
                      <option value="3">1</option>
                      <option value="4">1</option>
                      <option value="5">1</option>
                      <option value="6">1</option>
                      <option value="7">1</option>
                    </select>
                    <div id="compareRegion" className="group-selector"></div>
                    <div className="legend comparison_legend"></div>
                    <div>Total transactions on <span id="region_comparison_total_trans"></span></div>
                  </div>
                  <div className="pure-u-18-24">
                    <div id="region_comparison"></div>
                  </div>
                </div>
        ); 
    }
});


export default ComparisonChart;







