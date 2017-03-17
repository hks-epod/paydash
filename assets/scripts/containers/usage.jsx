'use strict';

import React from 'react';
import Select from 'react-select';

const D3= require('d3'); 

const Usage = React.createClass({

    fetchData: function() {
        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({
                    metrices: json
                });
            })
            .on('error', function(error) { 
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },
    setValue: function(value) {
        this.setState({ selectedMetric: value });
    },
    getInitialState: function() {
        return {
            metrices: [],
            selectedMetric : null
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function(){
        var _this = this;        

        return (
            <div className="sidebar_wrapper">
                <h3 className="sidebar__heading">METRIC</h3>
                <Select 
                    className ='monitor-selector'
                    name="region_selector" 
                    placeholder ="Select..."
                    options={this.state.metrices} 
                    clearable= {false}
                    onChange={this.setValue}
                    autosize = {true}
                    value={this.state.selectedMetric}
                    />
                <h3 className="sidebar__heading">COMPARISON</h3>
                <Select 
                    className ='monitor-selector'
                    name="region_selector" 
                    placeholder ="Select..."
                    options={this.state.metrices} 
                    clearable= {false}
                    onChange={this.setValue}
                    autosize = {true}
                    value={this.state.selectedMetric}
                    />
                <h3 className="sidebar__heading">FILTERS</h3>
                <Select 
                    className ='monitor-selector'
                    name="region_selector" 
                    placeholder ="Select..."
                    options={this.state.metrices} 
                    clearable= {false}
                    onChange={this.setValue}
                    autosize = {true}
                    value={this.state.selectedMetric}
                    />
            </div>    
        );
    }
});

export default Usage;
