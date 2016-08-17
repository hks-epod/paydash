'use strict';

import React from 'react';

const Card =  React.createClass({
  render: function(){
    return (
        <div className="pure-u pure-u-6-24">
            <div className="card">
                <div className="card-head">{this.props.data.name}</div>
                <div className="card-deisgnation">{this.props.data.designation}</div>
            </div>
        </div>
    ); 
  }
});


export default Card;
