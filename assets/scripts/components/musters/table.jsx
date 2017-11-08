'use strict';

import React from 'react';

const Table = React.createClass({
    render: function() {
        var _this = this;
        var table;

        if (_this.props.data.length > 0) {
            table = (
                <table className="muster-table">
                    <thead>
                        <tr>
                            {_this.props.data.length > 0 &&
                                Object.keys(_this.props.data[0]).map(function(key) {
                                    return <th key={key}>{_this.props.translation[key]}</th>;
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {_this.props.data.map(function(data, i) {
                            return (
                                <tr key={i}>
                                    {Object.keys(data).map(function(key, i) {
                                        if (key === 'step') {
                                            return (
                                                <td key={i}>
                                                    {_this.props.translation[data[key]]}
                                                </td>
                                            );
                                        }
                                        return <td key={i}>{data[key]}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        } else {
            table = <p>{_this.props.translation.no_muster_information}</p>;
        }

        return <div>{table}</div>;
    }
});

export default Table;
