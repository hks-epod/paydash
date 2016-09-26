'use strict';

import React from 'react';

const Tile =  React.createClass({
 
    render: function(){
        return (
            <div>
                <div className="overview-card-title">{this.props.data.region_name}</div>
                <div className="pure-g overview-card-details">
                    <div className="pure-u pure-u-8-24">
                        <div className="card-number-sub">{this.props.translation.current}</div>
                        <div>{this.props.data.current_total}</div>
                    </div>
                    <div className="pure-u pure-u-8-24">
                        <div className="card-number-sub">{this.props.translation.delayed}</div>
                        <div>{this.props.data.delayed_total}</div>
                    </div>
                    <div className="pure-u pure-u-8-24">
                        <div className="card-number-sub">{this.props.translation.days_to_payment}</div>
                        <div>{this.props.data.days_to_payment}</div>
                    </div>
                </div>
            </div>
        ); 
    }
});


export default Tile;
