'use strict';

import React from 'react';

const Table = React.createClass({

    render: function(){

        var _this = this;
        return (
            <div>
                <h1 className="">{_this.props.title}</h1>
                <table className="muster-table">
                    <thead>
                        <tr>
                        {
                            _this.props.data.length > 0 && Object.keys(_this.props.data[0]).map(function(key){
                                return <th key={key}>{_this.props.translation[key]}</th>;
                            })
                        }
                        </tr>
                    </thead>  
                    <tbody>
                    {
                        _this.props.data.map(function(data, i) {
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
                    </tbody>
                </table> 
            </div>     
        );
    }
});

export default Table;
