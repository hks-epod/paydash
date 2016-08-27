'use strict';

import React from 'react';
import Modal from '../global/modal.jsx';
import Table from './table.jsx';

const DistrictCard =  React.createClass({
 
    toggleModal() {
        const state = this.state.modalOpen;
        this.setState({ modalOpen: !state});
    },
    getInitialState: function(){
        return {
           modalOpen: false
         };
    },
    render: function(){
        return (
            <div className="pure-u pure-u-6-24">
                <div className="card">
                    <div className="card-top">
                        <div className="card-head">{this.props.data.block_name}</div>
                        <div className="card-designation">{this.props.data.block_code}</div>
                    </div>
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
                    <button className="button button--primary" onClick={this.toggleModal}>Officer details</button>
                </div>
            </div>
        ); 
    }
});


export default DistrictCard;
