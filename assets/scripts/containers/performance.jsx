'use strict';

import React from 'react';
import Tile from '../components/tile.jsx';

const D3= require('d3'); 

const Overview = React.createClass({

    fetchData: function() {

        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({performance: json.performance});
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
        return (
            <div className="performance-wrapper">
                {
                    this.state.performance.map(function(data, i) {
                        return <li></li>;
                    })
                }
            </div>     
        );
    }
});

export default Overview;
