'use strict';

import React from 'react';
import PanchayatForm from '../components/editor/panchayat-form.jsx';
import BlockForm from '../components/editor/block-form.jsx';

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
            editor:{
                table:[]
            }
        };
    },
    componentWillMount: function() {
        this.fetchData();
    },
    render: function(){

        var _this = this;
        var table;

        if(_this.state.editor.level === 'panchayat'){
            table = <PanchayatForm title={_this.state.translation.nav[_this.props.step]} data={_this.state.editor.table} translation={_this.state.translation}></PanchayatForm>;
        }
        if(_this.state.editor.level === 'block'){
            table = <PanchayatForm title={_this.state.translation.nav[_this.props.step]} data={_this.state.editor.table} translation={_this.state.translation}></PanchayatForm>;
        }
        return (
            <div className="editor__wrapper">
                {table}
            </div>     
        );
    }
});

export default Overview;
