'use strict';

import React from 'react';

const Sort = React.createClass({
    sort(event){
        this.props.sortBy(event.target.value);
    },
    render: function(){
        
        return (   
            <select onChange={this.sort} className="sort-bar button u-pull-right" name="" id="sort-controls">
                <option value='' disabled="true" defaultValue>Sort by</option>
                {
                    this.props.sortList.map(function(option, i){
                        return (<option key={i} value={option}>{option}</option>);
                    })
                }
            </select>
        );
    }
});

export default Sort;
