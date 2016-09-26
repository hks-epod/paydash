'use strict';

import React from 'react';

const Loader = React.createClass({

    render: function(){

        var divStyle = {
          display: this.props.loading ? 'block' : 'none'
        };

        return (   
            <div id="loader" style={divStyle} className="loader-overlay">
                <div className="loader">Loading...</div>
                <div className="loader-text ">Loading data...</div>
            </div>
        );
    }
});

export default Loader;
