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
    setMetric: function(value) {
        this.setState({ 
            selectedMetric: value, 
            selectedComparison: null,
            selectedFilters: {} 
        });
    },
    setComparison: function(value) {
        this.setState({ selectedComparison: value });
    },
    setFilter: function(filter) {
        var _this = this;

        return function(value){
            var newState= {selectedFilters:{}};
            newState.selectedFilters = _this.state.selectedFilters;
            newState.selectedFilters[filter]= value;
            _this.setState(newState);
        };
    },
    getInitialState: function() {
        return {
            metrices: [],
            selectedMetric : null,
            selectedComparison: null,
            selectedFilters: {}
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function(){
        var _this = this;

        var comparisonsList =  this.state.selectedMetric && this.state.selectedMetric.comparisons;
        return (
            <div className="sidebar_wrapper">
                <h3 className="sidebar__heading">METRIC</h3>
                <Select 
                    className ='monitor-selector'
                    name="metric_selector" 
                    placeholder ="Select..."
                    options={this.state.metrices} 
                    clearable= {false}
                    onChange={this.setMetric}
                    autosize = {true}
                    value={this.state.selectedMetric}
                    />
                <h3 className="sidebar__heading">COMPARISON</h3>
                <Select 
                    className ='monitor-selector'
                    name="comparison_selector" 
                    placeholder ="Select..."
                    options={comparisonsList} 
                    clearable= {false}
                    onChange={this.setComparison}
                    autosize = {true}
                    value={this.state.selectedComparison}
                    />
                <h3 className="sidebar__heading">FILTERS</h3>
                {

                    _this.state.selectedMetric && _this.state.selectedMetric.filters.map(function(filter, i) {
                        return <Select 
                                key = {i}
                                className ='monitor-selector'
                                name="filter_selector" 
                                placeholder = {filter.filter_label}
                                options={filter.options} 
                                clearable= {true}
                                onChange={_this.setFilter(filter.filter)}
                                autosize = {true}
                                value={_this.state.selectedFilters[filter.filter]}/>;
                    })
                }  
                
            </div>    
        );
    }
});

export default Usage;
