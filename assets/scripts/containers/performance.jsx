'use strict';

import React from 'react';
import Select from 'react-select';

const D3= require('d3'); 

const Overview = React.createClass({

    fetchData: function() {

        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({
                    config: json.config
                });
            })
            .on('error', function(error) { 
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },

    getInitialState: function() {
        return {
            performance: []
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function(){
        var options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];

        function logChange(val) {
            console.log('Selected: ' + val);
        }

        return (
            <div className="performance-wrapper">
              <Select name="form-field-name" value="one" options={options} onChange={logChange}/>  
            </div>     
        );
    }
});

export default Overview;
