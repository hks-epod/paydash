'use strict';

import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';

const Modal = React.createClass({

    render() {

        const styles = {
            modal: {
                display : (this.props.show) ? null : 'none'   
            }
        };
      
        return (
            <div className="modal-wrapper" style={styles.modal}>
                <div className="modal-item container-wide">
                    <span className="u-pull-right pe-7s-close-circle modal-close" onClick={this.props.onClose}></span>
                    { this.props.children }
                </div>
            </div>
        );
    }

});

export default Modal;
