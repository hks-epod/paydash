'use strict';

import React from 'react';
import Group from './group.jsx';

const D3= require('d3'); 

const Cards = React.createClass({

    fetchCards: function() {

        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({musters: json.cards});
            })
            .on('error', function(error) { 
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },

    getInitialState: function() {
        return {
            musters: []
        };
    },
    componentWillMount: function() {
        this.fetchCards();
    },
    render: function(){
        return (
            <div className="muster-list"> 
                {
                    this.state.musters.map(function(data, i) {
                        return <Group key={data.block_code}  data={data}></Group>;
                    })
                }
            </div>      
        );
    }
});

export default Cards;
