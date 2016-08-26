'use strict';

import React from 'react';

const Table = React.createClass({

    render: function(){
        return (
            <div>
                <h1 className="">{this.props.title}</h1>
                <table className="muster-table">
                    <thead>
                        <tr>
                        {
                            this.props.data.length > 0 && Object.keys(this.props.data[0]).map(function(key){
                                return <th key={key}>{key}</th>;
                            })
                        }
                        </tr>
                    </thead>  
                    <tbody>
                    {
                        this.props.data.map(function(data, i) {
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
