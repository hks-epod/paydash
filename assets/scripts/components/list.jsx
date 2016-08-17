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

    filterCards: function(event){

        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({musters: updatedList});
    },
    
    getInitialState: function() {
        return {
            musters: []
        };
    },
    componentDidMount: function() {
        this.fetchCards();
    },
    render: function(){
        return (
            <div className="filter-list">
                <input type="text" placeholder="Search" onChange={this.filterCards}/>
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
