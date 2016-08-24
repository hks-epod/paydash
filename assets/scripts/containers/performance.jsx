'use strict';

import React from 'react';
import Subnav from '../components/subnav.jsx';
import PerformanceChart from '../components/performance-chart.jsx';

const D3= require('d3'); 

const Overview = React.createClass({

    fetchData: function() {
        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({
                    config: json.config,
                    performance: json.performance,
                    isFetching : false,
                });
            })
            .on('error', function(error) { 
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },
    getInitialState: function() {
        return {
            performance: {},
            config: {},
            isFetching : true,
            active_region: null 
        };
    },
    setActiveRegion: function(value){
        console.log(value);
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function(){
        
        return (
            <div className="performance-wrapper">
              <Subnav onRegionChange={this.setActiveRegion} role={this.state.config.role} performance={this.state.performance}/>
              {/*<PerformanceChart/>*/}
            </div>     
        );
    }
});

export default Overview;
