'use strict';

import React from 'react';
import BlockCard from './block-card.jsx';
import Sort from './sort.jsx';

const BlockGroup =  React.createClass({

    filterCards: function(event){

        var updatedList = this.props.data.cards;
        updatedList = updatedList.filter(function(item){
            return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({cards: updatedList});
    },
    sortBy(field){

        var updatedList = this.props.data.cards.slice(0);

        updatedList.sort(function (a, b) {
            if(typeof(a[field]) === 'number'){

                if (a[field] > b[field]) return -1;
                if (a[field] < b[field]) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;

            } else if(typeof(a[field]) === 'string'){
                if (a[field].toLowerCase() > b[field].toLowerCase()) return 1;
                if (a[field].toLowerCase() < b[field].toLowerCase()) return -1;
                if (field!=='name') {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                }
                return 0;
            }
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
        var sortList = ['name', 'designation', 'current_total', 'delayed_total'];

        return (
            <div>
                <div className="group-head">
                    <input className="search-bar u-pull-right" type="text" placeholder="Search" onChange={this.filterCards}/>
                    <Sort sortList={sortList} sortBy={_this.sortBy} translation={_this.props.translation}></Sort>
                    <h1 className="u-inline-block">{this.props.data.region_name}</h1>
                </div>
                <div className="pure-g">
                {
                    this.state.cards.map(function(data, i) {
                        return <BlockCard key={i}  data={data} translation={_this.props.translation}></BlockCard>;
                    })
                }  
                </div>
            </div>
        ); 
    }
});


export default BlockGroup;
