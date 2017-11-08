'use strict';

import React from 'react';
import Tile from '../components/overview/tile.jsx';

const D3 = require('d3');

const Overview = React.createClass({
    fetchData: function() {
        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) {
                _this.setState({
                    overview: json.overview,
                    translation: json.translation
                });
            })
            .on('error', function(error) {
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },

    getInitialState: function() {
        return {
            overview: []
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function() {
        var _this = this;
        return (
            <div className="overview-wrapper">
                {_this.state.overview.map(function(data, i) {
                    return (
                        <Tile
                            key={data.region_code}
                            data={data}
                            translation={_this.state.translation}
                        />
                    );
                })}
            </div>
        );
    }
});

export default Overview;
