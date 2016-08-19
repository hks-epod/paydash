'use strict';

import React from 'react';

const D3= require('d3'); 

const Overview = React.createClass({

    fetchData: function() {

        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({overview: json});
            })
            .on('error', function(error) { 
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },

    getInitialState: function() {
        return {
            overview: []
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function(){
        return (
            <div> 
             
            </div>      
        );
    }
});

export default Overview;
