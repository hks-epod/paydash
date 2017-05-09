'use strict';

import React from 'react';
import Select from 'react-select';
import OutcomeChart from '../components/outcome/chart.jsx';
import OutcomeTable from '../components/outcome/table.jsx';

const D3 = require('d3');

const Usage = React.createClass({
    fetchData: function() {
        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) {
                _this.setState({
                    chart_menu: json.chart_menu,
                    chart: json.chart,
                    table: json.table
                });
            })
            .on('error', function(error) {
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },
    setMetric: function(value) {
        this.setState({
            selectedMetric: value
        });
    },
    getInitialState: function() {
        return {
            chart_menu: [],
            chart: [],
            table: [],
            selectedMetric: null
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function() {
        var _this = this;

        return (
            <div className="container-fluid">
                <div className="u-spacing-page-top">
                    <Select
                        className="outcome-selector u-pull-right"
                        name="metric_selector"
                        placeholder="Select..."
                        options={this.state.chart_menu}
                        clearable={false}
                        onChange={this.setMetric}
                        autosize={true}
                        value={this.state.selectedMetric}
                    />
                    <h3 className="sidebar__heading">Effect of receiving PayDash on days to complete step (by month of intervention)</h3>
                </div>
                <OutcomeChart data={this.state.chart} />
                <h3 className="sidebar__headin u-spacing-page-top">
                    Effect of receiving PayDash on days to complete payment step
                </h3>
                <OutcomeTable data={this.state.table} />
                <h5>* p &#60; 0.10, ** p &#60; 0.05, *** p &#60; 0.01</h5>
                <h5>P-values in parentheses</h5>
            </div>
        );
    }
});

export default Usage;
