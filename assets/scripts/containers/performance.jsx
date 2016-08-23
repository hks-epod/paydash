'use strict';

import React from 'react';
import Select from 'react-select';


const D3= require('d3'); 
const Regions = require('../lib/region');

const Overview = React.createClass({

    fetchData: function() {
        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({
                    config: json.config,
                    performance: json.performance
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
            config: {}
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    renderOption: function(option) {
        return <span className={ option.class }>{option.label}</span>;
    },
    render: function(){
        
        var list = Regions.list(this.state.performance, this.state.config);

        console.log(list);
        function logChange(val) {
            console.log('Selected: ' + val);
        }

        return (
            <div className="performance-wrapper">
              <Select 
                placeholder="Select a region"
                name="form-field-name" 
                options={list} 
                optionRenderer={this.renderOption}
                onChange={logChange}/>  
            </div>     
        );
    }
});

export default Overview;
