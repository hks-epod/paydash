'use strict';

import React from 'react';
import BlockGroup from '../components/musters/block-group.jsx';
import DistrictGroup from '../components/musters/district-group.jsx';
import Loader from '../components/global/loader.jsx';

const D3 = require('d3');

const Musters = React.createClass({
    fetchMusters: function() {
        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) {
                _this.setState({
                    musters: json.musters,
                    translation: json.translation,
                    config: json.config,
                    isFetching: false
                });
            })
            .on('error', function(error) {
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },

    getInitialState: function() {
        return {
            musters: [],
            config: {},
            isFetching: true
        };
    },
    componentWillMount: function() {
        this.fetchMusters();
    },
    render: function() {
        var _this = this;
        var divStyle = {
            display: this.state.isFetching ? 'none' : 'block'
        };
        return (
            <div>
                <Loader loading={this.state.isFetching} />
                <div className="muster-list" style={divStyle}>
                    {_this.state.musters.map(function(data, i) {
                        if (_this.state.config.role === 'block') {
                            return (
                                <BlockGroup
                                    key={data.region_code}
                                    data={data}
                                    translation={_this.state.translation}
                                />
                            );
                        } else if (_this.state.config.role === 'district') {
                            return (
                                <DistrictGroup
                                    key={data.region_code}
                                    data={data}
                                    translation={_this.state.translation}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
});

export default Musters;
