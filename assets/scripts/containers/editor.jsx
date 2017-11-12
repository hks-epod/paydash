'use strict';

import React from 'react';
import PanchayatForm from '../components/editor/panchayat-form.jsx';
import BlockForm from '../components/editor/block-form.jsx';
import Sidebar from '../components/editor/sidebar.jsx';

const D3 = require('d3');

const Overview = React.createClass({
    fetchData: function(block_code) {
        var _this = this;

        var block_code_url_string = block_code ? '&block_code=' + block_code : '';

        D3.json(_this.props.url + '?step=' + _this.props.step + block_code_url_string)
            .on('load', function(json) {
                _this.setState({
                    editor: json.editor,
                    translation: json.translation,
                    user: json.user
                });
            })
            .on('error', function(error) {
                console.error(_this.props.url, status, error.toString());
            })
            .get();
    },

    updateSavedState: function(status) {
        this.setState({
            unsaved: status
        });
    },

    getInitialState: function() {
        return {
            editor: {
                table: []
            },
            unsaved: false
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function() {
        var _this = this;
        var table, sidebar;

        if (_this.state.editor.level === 'panchayat') {
            table = (
                <PanchayatForm
                    updateSavedState={_this.updateSavedState}
                    step={_this.props.step}
                    user={_this.state.user}
                    data={_this.state.editor}
                    translation={_this.state.translation}
                />
            );
        }
        if (_this.state.editor.level === 'block') {
            table = (
                <BlockForm
                    updateSavedState={_this.updateSavedState}
                    step={_this.props.step}
                    user={_this.state.user}
                    data={_this.state.editor}
                    translation={_this.state.translation}
                />
            );
        }
        if (_this.state.translation) {
            sidebar = (
                <Sidebar
                    unsaved={_this.state.unsaved}
                    user={_this.state.user}
                    translation={_this.state.translation}
                    fetchData={_this.fetchData}
                />
            );
        }
        return (
            <div className="pure-g">
                <div className="pure-u pure-u-5-24 u-spacing-page-top">{sidebar}</div>
                <div className="pure-u pure-u-19-24">{table}</div>
            </div>
        );
    }
});

export default Overview;
