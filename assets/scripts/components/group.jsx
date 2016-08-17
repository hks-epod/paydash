'use strict';

import React from 'react';
import Card from './card.jsx';

const Group =  React.createClass({


    filterCards: function(event){

        var updatedList = this.props.data.cards;
        updatedList = updatedList.filter(function(item){
            return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
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
        return (
            <div>
                <div className="group-head">
                    <input className="search-bar u-pull-right" type="text" placeholder="Search" onChange={this.filterCards}/>
                    <h1 className="u-inline-block">{this.props.data.block_name}</h1>
                </div>
                <div className="pure-g">
                {
                    this.state.cards.map(function(data, i) {
                        return <Card key={i}  data={data}></Card>;
                    })
                }  
                </div>
            </div>
        ); 
    }
});


export default Group;
