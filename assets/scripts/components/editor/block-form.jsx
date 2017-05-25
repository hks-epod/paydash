'use strict';

import React from 'react';

const D3 = require('d3');

const Table = React.createClass({
    handleSubmit(event) {
        var _this = this;

        ga('send', 'event', {
            eventCategory: 'Editor Screen',
            eventAction: 'click',
            eventLabel: _this.props.step + '/' + _this.props.user.id
        });
        D3.xhr('/editor/data').header('Content-Type', 'application/json').post(JSON.stringify({
            block_code: _this.state.data.block_code,
            step: _this.props.step,
            data: this.state.data
        }), function(err, rawData) {
            _this.setState({
                unsavedChanges: rawData.response
            });
            _this.props.updateSavedState(false);
        });
    },

    handleChange(event) {
        this.props.updateSavedState(true);
        var updatedState = this.state.data;
        updatedState.table[event.target.dataset.index][event.target.name] = event.target.value;

        this.setState({
            data: updatedState,
            unsavedChanges: this.props.translation.editor.unsaved
        });
    },

    getInitialState: function() {
        return {
            data: [],
            unsavedChanges: ''
        };
    },

    componentWillMount: function() {
        this.setState({ data: this.props.data });
    },
    componentWillReceiveProps: function() {
        this.setState({ data: this.props.data });
    },

    render: function() {
        var _this = this;
        var table;

        if (_this.state.data.table.length > 0) {
            table = (
                <table className="editor__table">
                    <thead>
                        <tr>
                            <th>{_this.props.translation.editor.table['name']}</th>
                            <th>{_this.props.translation.editor.table['mobile_no']}</th>
                            <th>{_this.props.translation.editor.table['designation']}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_this.state.data.table.map(function(data, i) {
                            return (
                                <tr key={i}>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            data-index={i}
                                            defaultValue={data.name || ''}
                                            onChange={_this.handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="mobile_no"
                                            data-index={i}
                                            defaultValue={data.mobile_no || ''}
                                            onChange={_this.handleChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="designation"
                                            defaultValue={data.designation || ''}
                                            data-index={i}
                                            onChange={_this.handleChange}
                                        >
                                            <option value="" />
                                            {_this.state.data.designations.map(function(
                                                designation,
                                                index
                                            ) {
                                                return (
                                                    <option key={index} value={designation}>
                                                        {designation}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        } else {
            table = <p>No data</p>;
        }

        return (
            <div>
                <h2 className="u-spacing-page-top">
                    {_this.props.translation.long_labels[_this.props.step]}
                </h2>
                <div>
                    {_this.props.translation.editor.instruction}
                    {' '}
                    {_this.props.translation.long_labels[_this.props.step]}
                    .
                </div>
                <div className="editor__table__header u-cf u-spacing-page-top">
                    <h5 className="u-pull-left">{_this.state.unsavedChanges}</h5>
                    <button
                        className="button button--primary u-pull-right"
                        onClick={this.handleSubmit}
                    >
                        {this.props.translation.editor.save}
                    </button>
                </div>

                {table}
            </div>
        );
    }
});

export default Table;
