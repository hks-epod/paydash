'use strict';

import React from 'react';
import DistrictCard from './district-card.jsx';
import Sort from './sort.jsx';

const BlockGroup =  React.createClass({

    filterCards: function(event){
        var updatedList = this.props.data.cards;
        updatedList = updatedList.filter(function(item){
    
            var match = false;
    
            if(item.block_name.toLowerCase().search(event.target.value.toLowerCase()) !== -1){
                match  = true;
            }

            item.officers.forEach(function(officer){
                if(officer.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1){
                    match = true;
                }
            });

            return match;
        });
        this.setState({cards: updatedList});
    },
    sortBy(field){
        var updatedList = this.props.data.cards;
    
        updatedList.sort(function (a, b) {

            if (a[field] > b[field]) {
              return (typeof(a[field]) === 'number' ? -1 : 1);
            }
            if (a[field] < b[field]) {
              return (typeof(a[field])=== 'number' ? 1 : -1);
            }
            return 0;
        });

        this.setState({cards: updatedList});
    },
    getInitialState: function(){
        return {
           cards: []
         };
    },
    componentWillMount: function(){
        this.setState({cards: this.props.data.cards});
    },
    render: function(){

        var _this = this;
        var sortList = ['block_name', 'current_total', 'delayed_total', 'days_to_payment'];

        return (
            <div>
                <div className="group-head">
                    <input className="search-bar u-pull-right" type="text" placeholder="Search" onChange={_this.filterCards}/>
                    <Sort sortList={sortList} sortBy={_this.sortBy} translation={_this.props.translation}></Sort>
                    <h1 className="u-inline-block">{_this.props.data.region_name}</h1>
                </div>
                <div className="pure-g">
                {
                    _this.state.cards.map(function(data, i) {
                        return <DistrictCard key={i}  data={data} translation={_this.props.translation}></DistrictCard>;
                    })
                }  
                </div>
            </div>
        ); 
    }
});


export default BlockGroup;
