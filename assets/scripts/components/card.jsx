'use strict';

import React from 'react';

const Card =  React.createClass({
  render: function(){
    return (
        <div>
            {this.props.data.name}
        </div>
    ); 
  }
});


export default Card;
