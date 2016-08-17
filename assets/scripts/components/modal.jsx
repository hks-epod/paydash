'use strict';

import React from 'react';
import {render} from 'react-dom';

const Modal = React.createClass({

    render() {

        const styles = {
            modal: {
                display : (this.props.show) ? null : 'none', 
                backgroundColor : 'rgba(255, 255, 255, 0.8)',       
            }
        };
      
        return (
            <div className="modal-wrapper" style={styles.modal}>
                <span onClick={this.props.onClose}>close</span>
                <div className="modal-item container">
                    { this.props.children }
                </div>
            </div>
        );
    }

});

export default Modal;
