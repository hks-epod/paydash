'use strict';

import React from 'react';
import Card from './card.jsx';
import D3 from 'd3';

const Cards = React.createClass({
  loadCommentsFromServer: function() {

      D3.json(function(err, data){
        
      });

      // $.ajax({
      //   url: this.props.url,
      //   dataType: 'json',
      //   cache: false,
      //   success: function(data) {
      //     this.setState({data: data});
      //   }.bind(this),
      //   error: function(xhr, status, err) {
      //     console.error(this.props.url, status, err.toString());
      //   }.bind(this)
      // });
    },
  render: function(){
    return (
      <div className="filter-list">
      <Card items={this.state.items}/>
      </div>
    );
  }
});


// const Cards = React.createClass({
//   filterList: function(event){
//     var updatedList = this.state.initialItems;
//     updatedList = updatedList.filter(function(item){
//       return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
//     });
//     this.setState({items: updatedList});
//   },
//   getInitialState: function(){
//      return {
//        initialItems: [
//          'one',
//          'two'
//        ],
//        items: []
//      };
//   },
//   componentWillMount: function(){
//     this.setState({items: this.state.initialItems});
//   },
//   render: function(){
//     return (
//       <div className="filter-list">
//         <input type="text" placeholder="Search" onChange={this.filterList}/>
//       <List items={this.state.items}/>
//       </div>
//     );
//   }
// });

export default Cards;
