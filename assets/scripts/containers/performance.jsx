'use strict';

import React from 'react';
import Subnav from '../components/performance/subnav.jsx';
import OverviewChart from '../components/performance/overview-chart.jsx';
import ComparisonChart from '../components/performance/comparison-chart.jsx';
import Loader from '../components/global/loader.jsx';

const Regions = require('../lib/region');
const D3 = require('d3');

const Overview = React.createClass({
    fetchData: function() {
        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) {
                _this.setState({
                    config: json.config,
                    performance: json.performance,
                    translation: json.translation,
                    isFetching: false,
                    activeRegion: Regions.list(json.performance, json.config.role)[0]
                });
            })
            .on('error', function(error) {
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },
    getInitialState: function() {
        return {
            performance: {},
            config: {},
            isFetching: true,
            activeRegion: null
        };
    },
    setActiveRegion: function(value) {
        this.setState({
            activeRegion: value
        });
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function() {
        var divStyle = {
            display: this.state.isFetching ? 'none' : 'block'
        };
        return (
            <div>
                <Loader loading={this.state.isFetching} />
                <div className="performance-wrapper" style={divStyle}>
                    <Subnav
                        defaultRegion={this.state.activeRegion}
                        onRegionChange={this.setActiveRegion}
                        role={this.state.config.role}
                        performance={this.state.performance}
                    />
                    <OverviewChart
                        activeRegion={this.state.activeRegion}
                        performance={this.state.performance}
                        config={this.state.config}
                        translation={this.state.translation}
                    />
                    <div className="u-region-divider" />
                    <ComparisonChart
                        activeRegion={this.state.activeRegion}
                        performance={this.state.performance}
                        config={this.state.config}
                        translation={this.state.translation}
                    />
                </div>
            </div>
        );
    }
});

export default Overview;
