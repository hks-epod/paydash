'use strict';

import React from 'react';
import BlockGroup from '../components/musters/block-group.jsx';
import DistrictGroup from '../components/musters/district-group.jsx';

const D3= require('d3'); 

const Musters = React.createClass({

    fetchMusters: function() {

        var _this = this;
        D3.json(_this.props.url)
            .on('load', function(json) { 
                _this.setState({
                    musters: json.musters,
                    translation: json.translation,
                    config: json.config
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
            config: {}
        };
    },
    componentWillMount: function() {
        this.fetchMusters();
    },
    render: function(){
        
        var _this = this;

        return (
            <div className="muster-list"> 
                {
                    _this.state.musters.map(function(data, i) {
                        if(_this.state.config.role ==='block'){
                            return <BlockGroup key={data.region_code}  data={data} translation={_this.state.translation}></BlockGroup>;    
                        }
                        else if(_this.state.config.role ==='district'){
                            return <DistrictGroup key={data.region_code}  data={data} translation={_this.state.translation}></DistrictGroup>;    
                        }
                    })
                }
            </div>      
        );

        
        
    }
});

export default Musters;
