'use strict';

import React from 'react';
import Modal from '../global/modal.jsx';
import Table from './table.jsx';

const BlockCard =  React.createClass({
 
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
                        <div className="card-head">{this.props.data.name}</div>
                        <div className="card-designation">{this.props.data.designation}</div>
                        <div className="card-designation">{this.props.data.mobile}</div>
                    </div>
                    <div className="card-numbers pure-g">
                        <div className="pure-u pure-u-12-24 ">
                            <div className="card-number-sub">{this.props.translation.current}</div>
                            <div>{this.props.data.current_total}</div>
                        </div>
                        <div className="pure-u pure-u-12-24 ">
                            <div className="card-number-sub">{this.props.translation.delayed}</div>
                            <div>{this.props.data.delayed_total}</div>
                        </div>
                    </div>
                    <button className="button button--primary" onClick={this.toggleModal}>{this.props.translation.muster_details}</button>
                    <Modal show={ this.state.modalOpen } onClose={this.toggleModal}>  
                        <Table title="DELAYED MUSTERS" data={this.props.data.delayed_musters}></Table>
                        <Table title="CURRENT MUSTERS" data={this.props.data.current_musters}></Table>
                    </Modal>
                </div>
            </div>
        ); 
    }
});


export default BlockCard;
