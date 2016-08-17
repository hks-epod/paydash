'use strict';

import React from 'react';

const Table = React.createClass({

    render: function(){
        return (
            <table className="muster-table">
                <thead>
                    <tr>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
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
        );
    }
});

export default Table;
