'use strict';

import React from 'react';
import Modal from '../global/modal.jsx';
import Table from './table.jsx';

const BlockCard =  React.createClass({
 
    toggleModal() {
        const state = this.state.modalOpen;
        this.setState({ modalOpen: !state});
        ga('send', 'event', {
            eventCategory: 'Block Muster detail',
            eventAction: 'click',
            eventLabel: this.props.data.staff_id + '/' + this.props.identifier
        });
    },
    getInitialState: function(){
        return {
           modalOpen: false
         };
    },
    render: function(){

        if(this.props.data.delayed_musters.length>0){
            var delayed_table = <Table title={this.props.translation.delayed} data={this.props.data.delayed_musters} translation={this.props.translation}></Table>;
        }
        if(this.props.data.current_musters.length>0){
            var current_table = <Table title={this.props.translation.current} data={this.props.data.current_musters} translation={this.props.translation}></Table>;
        }
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
                        <Table title={this.props.translation.delayed} data={this.props.data.delayed_musters} translation={this.props.translation}></Table>
                        <Table title={this.props.translation.current} data={this.props.data.current_musters} translation={this.props.translation}></Table> 
                    </Modal>
                </div>
            </div>
        ); 
    }
});


export default BlockCard;
