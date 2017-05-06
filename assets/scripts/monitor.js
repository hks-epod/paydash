'use strict';

import React from 'react';
import { render } from 'react-dom';
import Usage from './containers/usage.jsx';
import Outcome from './containers/outcome.jsx';
import ActiveLink from './lib/active-link';

require('./lib/dropdown');

if (window.location.pathname === '/monitor/usage') {
    render(<Usage url="/monitor/usage/metric" />, document.getElementById('monitor_usage'));
}

if (window.location.pathname === '/monitor/usage') {
    render(<Usage url="/monitor/usage/metric" />, document.getElementById('monitor_usage'));
}

if (window.location.pathname === '/monitor/outcome') {
    render(<Outcome url="/monitor/outcome/data" />, document.getElementById('monitor_outcome'));
}

ActiveLink.init();
