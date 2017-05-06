'use strict';

import React from 'react';
import MG from 'metrics-graphics';

const D3 = require('d3');
const Parser = require('../../lib/parser');

const Row = React.createClass({
    render: function() {
        var _this = this;
        return (
            <tr>
                {_this.props.data.map(function(d, i) {
                    return <td key={i}>{d}</td>;
                })}
            </tr>
        );
    }
});

const UsageChart = React.createClass({
    render: function() {
        return (
            <div className="pure-g">
                <table className="table">
                    <tbody>
                        {this.props.data.map(function(data, i) {
                            return <Row data={data} key={i} />;
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
});

export default UsageChart;
