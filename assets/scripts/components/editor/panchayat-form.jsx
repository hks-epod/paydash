'use strict';

import React from 'react';

const D3 = require('d3');

const Table = React.createClass({

    handleSubmit(event) {

        var _this = this;
        D3.xhr('/editor/data')
            .header('Content-Type', 'application/json')
            .post(
                JSON.stringify(this.state.data),
                function(err, rawData){
                    _this.setState({
                        unsaved : rawData.response
                    });
                }
            );
    },

    handleChange(event) {

        this.setState({
            unsaved : 'You have unsaved changes'
        });
 
        var updatedState = this.state.data;
        updatedState[event.target.dataset.index][event.target.name] = event.target.value;
        
        this.setState({
            data : updatedState
        });

    },

    getInitialState: function() {
        return {
            data : [],
            unsaved: ''
        };
    },

    componentWillMount: function(){
        this.setState({data: this.props.data});
    },

    render: function(){

        var _this = this;
        var table;

        if(_this.state.data.length>0){
            table = (<table className="editor__table">
                    <thead>
                        <tr>
                            <th>{_this.props.translation.interface['panchayat_name']}</th>
                            <th>{_this.props.translation.interface['name']}</th>
                            <th>{_this.props.translation.interface['mobile_no']}</th>
                            <th>{_this.props.translation.interface['designation']}</th>
                        </tr>
                    </thead>  
                    <tbody>
                    {
                        _this.state.data.map(function(data, i) {
                            return (
                                <tr key={i}>
                                    <td >{data.panchayat_name}</td>
                                    <td><input type="text" name="name" data-index={i} defaultValue={data.name || ''} onChange={_this.handleChange}/></td>
                                    <td><input type="text" name="mobile_no" data-index={i} defaultValue={data.mobile_no || ''} onChange={_this.handleChange}/></td>
                                    <td><input type="text" name="designation" data-index={i} defaultValue={data.designation || ''} onChange={_this.handleChange}/></td>
                                </tr>
                            );
                        })
                    }   
                    </tbody>
                </table>);
        } else{
            table = <p>No data</p>;
        }

        return (
            <div>
                <button className="button button--primary u-pull-right" onClick={this.handleSubmit}>Save</button>
                <span>{_this.state.unsaved}</span>
                {table}
            </div>     
        );
    }
});

export default Table;
