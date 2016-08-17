'use strict';

import React from 'react';

const Card =  React.createClass({
  render: function(){
    return (
        <div className="pure-u pure-u-6-24">
            <div className="card">
                <div className="card-head">{this.props.data.name}</div>
                <div className="card-designation">{this.props.data.designation}</div>
                <div className="card-numbers pure-g">
                    <div className="pure-u pure-u-12-24 ">
                        <div className="card-number-sub">CURRENT</div>
                        <div>{this.props.data.current_total}</div>
                    </div>
                    <div className="pure-u pure-u-12-24 ">
                        <div className="card-number-sub">DELAYED</div>
                        <div>{this.props.data.delayed_total}</div>
                    </div>
                </div>
            </div>
        </div>
    ); 
  }
});


export default Card;
