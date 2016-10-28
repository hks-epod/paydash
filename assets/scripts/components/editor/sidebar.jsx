'use strict';

import React from 'react';

const Table = React.createClass({

    handleChange(event) {
    },

    render: function(){

        var _this = this;


        return (
            <div className="u-pos-fixed">
              <div className="editor__subtext">
                  {_this.props.translation.title}
              </div> 
              <select className="editor__selector" name="share_region" value="" id="lang">
                  <option value="Hello">Hello</option>
              </select>
              <div className="menu menu--vertical menu--pointing-right menu--borderRight menu--width-wide">
                <a onClick={_this.handleChange} className="menu-item" href="/editor/t2">{_this.props.translation.nav.t2}</a>
                <a onClick={_this.handleChange} className="menu-item" href="/editor/t5">{_this.props.translation.nav.t5}</a>
                <a onClick={_this.handleChange} className="menu-item" href="/editor/t6">{_this.props.translation.nav.t6}</a>
                <a onClick={_this.handleChange} className="menu-item" href="/editor/t7">{_this.props.translation.nav.t7}</a>
                <a onClick={_this.handleChange} className="menu-item" href="/editor/t8">{_this.props.translation.nav.t8}</a>
              </div>
            </div>   
        );
    }
});

export default Table;

