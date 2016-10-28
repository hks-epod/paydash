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
                            <th>{_this.props.translation.editor.table['panchayat_name']}</th>
                            <th>{_this.props.translation.editor.table['name']}</th>
                            <th>{_this.props.translation.editor.table['mobile_no']}</th>
                            <th>{_this.props.translation.editor.table['designation']}</th>
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
                <div className="editor__table__header u-cf u-spacing-page-top">
                    <h2 className="u-pull-left">{_this.props.title}</h2>
                    <button className="button button--primary u-pull-right" onClick={this.handleSubmit}>{this.props.translation.editor.save}</button>
                    <h6 className="u-pull-right">{_this.state.unsaved}</h6>
                </div>  
                {table}
            </div>     
        );
    }
});

export default Table;
