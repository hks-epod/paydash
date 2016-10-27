'use strict';

import React from 'react';

const D3 = require('d3');

const Table = React.createClass({

    handleSubmit(event) {

        
        console.log('form submit');

    },

    handleChange(event) {

        this.setState({
            unsaved : 'You have unsaved changes'
        });
        
    },

    getInitialState: function() {
        return {
            unsaved: ''
        };
    },

    render: function(){

        var _this = this;
        var table;

        if(_this.props.data.length>0){
            table = (<table className="editor__table">
                    <thead>
                        <tr>
                            <th>{_this.props.translation.interface['name']}</th>
                            <th>{_this.props.translation.interface['mobile_no']}</th>
                            <th>{_this.props.translation.interface['designation']}</th>
                        </tr>
                    </thead>  
                    <tbody>
                    {
                        _this.props.data.map(function(data, i) {
                            return (
                                <tr key={i}>
                                    <td><input type="text" defaultValue={data.name || ''} onChange={this.handleChange}/></td>
                                    <td><input type="text" defaultValue={data.mobile_no || ''} onChange={this.handleChange}/></td>
                                    <td><input type="text" defaultValue={data.designation || ''} onChange={this.handleChange}/></td>
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
                <form>
                    {table}
                    <p>{_this.state.unsaved}</p>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>     
        );
    }
});

export default Table;
