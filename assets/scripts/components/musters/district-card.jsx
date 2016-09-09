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
                    <div className="district-card-top">
                        <div className="card-head">{this.props.data.block_name}</div>
                    </div>
                    <div className="district-card-numbers pure-g">
                        <div className="pure-u pure-u-24-24 ">
                            <div className="card-number-sub">{this.props.translation.days_to_payment}</div>
                            <div>{this.props.data.days_to_payment}</div>
                        </div>
                    </div>
                    <div className="district-card-numbers pure-g">
                        <div className="pure-u pure-u-12-24 ">
                            <div className="card-number-sub">{this.props.translation.current}</div>
                            <div>{this.props.data.current_total}</div>
                        </div>
                        <div className="pure-u pure-u-12-24 ">
                            <div className="card-number-sub">{this.props.translation.delayed}</div>
                            <div>{this.props.data.delayed_total}</div>
                        </div>
                    </div>
                    <h4 className="card-officer-title">{this.props.translation.officers}</h4>
                    {
                        this.props.data.officers.map(function(officer, i) {
                            return (
                               <div className="card-officer" key={i}>
                                    <div>{officer.name}</div>
                                    <div className="card-officer-sub">
                                        {officer.designation}
                                        <span className="u-pull-right">{officer.mobile}</span>
                                    </div>
                               </div>
                            );
                        })
                    }
                    <button className="button button--primary" onClick={this.toggleModal}>{this.props.translation.muster_details}</button>
                    <Modal show={ this.state.modalOpen } onClose={this.toggleModal}>  
                        <h1 className="">MUISTER DETAILS</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Step</td>
                                    <td>Total</td>
                                    <td>Average</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>T+2</td>
                                    <td>{this.props.data.t2_total}</td>
                                    <td>{this.props.data.t2_avg}</td>
                                </tr>
                                <tr>
                                    <td>T+5</td>
                                    <td>{this.props.data.t5_total}</td>
                                    <td>{this.props.data.t5_avg}</td>
                                </tr>
                                <tr>
                                    <td>T+6</td>
                                    <td>{this.props.data.t6_total}</td>
                                    <td>{this.props.data.t6_avg}</td>
                                </tr>
                                <tr>
                                    <td>T+7</td>
                                    <td>{this.props.data.t7_total}</td>
                                    <td>{this.props.data.t7_avg}</td>
                                </tr>
                                <tr>
                                    <td>T+8</td>
                                    <td>{this.props.data.t8_total}</td>
                                    <td>{this.props.data.t8_avg}</td>
                                </tr>
                            </tbody>
                            
                        </table>   
                    </Modal>
                </div>
            </div>
        ); 
    }
});


export default DistrictCard;
