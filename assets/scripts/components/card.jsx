'use strict';

import React from 'react';
import Modal from './modal.jsx';

const Card =  React.createClass({
 
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
                            <div className="card-number-sub">CURRENT</div>
                            <div>{this.props.data.current_total}</div>
                        </div>
                        <div className="pure-u pure-u-12-24 ">
                            <div className="card-number-sub">DELAYED</div>
                            <div>{this.props.data.delayed_total}</div>
                        </div>
                    </div>
                    <button className="button button--primary" onClick={this.toggleModal}>Muster details</button>
                    <Modal bg="#222" show={ this.state.modalOpen } onClose={this.toggleModal}>  
                        <table>  
                           { /*<tr>
                                {
                                    Object.keys(this.props.data.delayed_musters[0]).map(function(key, i) {
                                        return <td key={i}>{key}</td>;
                                    })
                                }
                            </tr>*/}
                        {
                            this.props.data.delayed_musters.map(function(data, i) {
                                return (
                                    <tr key={i}>
                                        {
                                            Object.keys(data).map(function(key, i) {
                                                return <td key={i}>{data[key]}</td>;
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }   
                        </table>     
                    </Modal>
                </div>
            </div>
        ); 
    }
});


export default Card;
