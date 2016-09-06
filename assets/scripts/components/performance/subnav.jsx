'use strict';

import React from 'react';
import Select from 'react-select';

const Regions = require('../../lib/region');

const Subnav =  React.createClass({
 
    getInitialState: function(){
        return {
            value: null
        };
    },
    renderOption: function(option) {
        return <span className={ option.class }>{option.label}</span>;
    },
    renderValue: function(option) {
        return <span >{option.label}</span>;
    },
    setValue: function(value) {
        this.setState({ value });
        this.props.onRegionChange(value);
    },
    componentWillReceiveProps : function(nextProps){
        this.setState({ value: nextProps.defaultRegion });
    },
    render: function(){
        var list = Regions.list(this.props.performance, this.props.role);
        return (
            <div className="subnav">
                <span id="region-name" className="subnav-name">{this.state.value && this.state.value.label} &nbsp;</span>
                <Select 
                    className ='region-selector u-pull-right'
                    name="region_selector" 
                    placeholder ="Select..."
                    options={list} 
                    clearable= {false}
                    optionRenderer={this.renderOption}
                    onChange={this.setValue}
                    autosize = {true}
                    value={this.state.value}
                    valueRenderer={this.renderValue} />
            </div>
            
        ); 
    }
});


export default Subnav;
