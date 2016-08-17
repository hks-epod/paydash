'use strict';

import React from 'react';
import Card from './card.jsx';

const Group =  React.createClass({
  render: function(){
    return (
      <div>
        <h2>{this.props.data.block_name}</h2>
      </div>
    ); 
  }
});


export default Group;
