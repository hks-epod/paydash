'use strict';

import React from 'react';
import {render} from 'react-dom';
import Usage from './containers/usage.jsx';
import ActiveLink from './lib/active-link';

require('./lib/dropdown');


if (window.location.pathname === '/monitor/usage') {
    render( <Usage url='/monitor/usage/metric'/> , document.getElementById('usage_sidebar'));
}

ActiveLink.init();