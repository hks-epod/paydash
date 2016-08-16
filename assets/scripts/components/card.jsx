'use strict';

import React from 'react';

const Card =  React.createClass({
  render: function(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li key={item}>{item}</li>;
        })
       }
      </ul>
    ); 
  }
});


export default Card;
