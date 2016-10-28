'use strict';

import React from 'react';

const Table = React.createClass({

    handleChange(event) {
    },

    render: function(){

        var _this = this;


        return (
            <div>
                <button onClick={_this.handleChange} className="menu-item" href="/editor/t2">{_this.props.translation.editor.nav.t2}</button>
                <button onClick={_this.handleChange} className="menu-item" href="/editor/t5">{_this.props.translation.editor.nav.t5}</button>
                <button onClick={_this.handleChange} className="menu-item" href="/editor/t6">{_this.props.translation.editor.nav.t6}</button>
                <button onClick={_this.handleChange} className="menu-item" href="/editor/t7">{_this.props.translation.editor.nav.t7}</button>
                <button onClick={_this.handleChange} className="menu-item" href="/editor/t8">{_this.props.translation.editor.nav.t8}</button>
            </div>     
        );
    }
});

export default Table;

