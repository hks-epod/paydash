'use strict';

import React from 'react';

const D3= require('d3'); 

const Overview = React.createClass({

    fetchData: function() {
        var _this = this;
        D3.json(_this.props.url + '?step=' + _this.props.step)
            .on('load', function(json) { 
                _this.setState({
                    editor: json.editor,
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
            editor: []
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function(){
        var _this = this;
        return (
            <div className="editor-wrapper">
            </div>     
        );
    }
});

export default Overview;
