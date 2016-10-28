'use strict';

import React from 'react';

const D3 = require('d3');

const Table = React.createClass({

    handleSubmit(event) {

        var _this = this;

        ga('send', 'event', {
            eventCategory: 'Editor Screen',
            eventAction: 'click',
            eventLabel: _this.props.step + '/' + _this.props.user.id
        });

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

        this.props.updateSavedState();
        var updatedState = this.state.data;
        updatedState.table[event.target.dataset.index][event.target.name] = event.target.value;
        
        this.setState({
            data : updatedState
        });

    },

    getInitialState: function() {
        return {
            data : []
        };
    },

    componentWillMount: function(){
        this.setState({data: this.props.data});
    },

    render: function(){

        var _this = this;
        var table;

        if(_this.state.data.table.length>0){
            table = (<table className="editor__table">
                    <thead>
                        <tr>
                            <th>{_this.props.translation.editor.table['panchayat_name']}</th>
                            <th>{_this.props.translation.editor.table['name']}</th>
                            <th>{_this.props.translation.editor.table['mobile_no']}</th>
                            <th>{_this.props.translation.editor.table['designation']}</th>
                        </tr>
                    </thead>  
                    <tbody>
                    {
                        _this.state.data.table.map(function(data, i) {
                            return (
                                <tr key={i}>
                                    <td >{data.panchayat_name}</td>
                                    <td><input type="text" name="name" data-index={i} defaultValue={data.name || ''} onChange={_this.handleChange}/></td>
                                    <td><input type="text" name="mobile_no" data-index={i} defaultValue={data.mobile_no || ''} onChange={_this.handleChange}/></td>
                                    <td>
                                        <select name="designation" defaultValue={data.designation || ''}  data-index={i} onChange={_this.handleChange}>
                                            <option value=""></option>
                                            {
                                              _this.state.data.designations.map(function(designation, index) {
                                                return <option key={index} value={designation}>{designation}</option>;
                                              })
                                            }
                                        </select>
                                    </td>
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
                <div className="editor__table__header u-cf u-spacing-page-top">
                    <h2 className="u-pull-left">{_this.props.translation.nav[_this.props.step]}</h2>
                    <button className="button button--primary u-pull-right" onClick={this.handleSubmit}>{this.props.translation.editor.save}</button>
                </div>  
                <div>{_this.props.translation.editor.instruction} {_this.props.translation.nav[_this.props.step]}</div>
                {table}
            </div>     
        );
    }
});

export default Table;
