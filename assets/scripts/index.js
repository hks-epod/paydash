'use strict';

import React from 'react';
import { render } from 'react-dom';
import Musters from './containers/musters.jsx';
import Overview from './containers/overview.jsx';
import Performance from './containers/performance.jsx';
import Editor from './containers/editor.jsx';
import ActiveLink from './lib/active-link';

require('./lib/dropdown');

if (window.location.pathname === '/musters') {
    render(<Musters url="/musters/data" />, document.getElementById('musters'));
}

if (window.location.pathname === '/overview') {
    render(<Overview url="/overview/data" />, document.getElementById('overview'));
}

if (window.location.pathname === '/performance') {
    render(<Performance url="/performance/data" />, document.getElementById('performance'));
}

if (window.location.pathname === '/editor/t2') {
    render(<Editor url="/editor/data" step="t2" />, document.getElementById('editor'));
}

if (window.location.pathname === '/editor/t5') {
    render(<Editor url="/editor/data" step="t5" />, document.getElementById('editor'));
}

if (window.location.pathname === '/editor/t6') {
    render(<Editor url="/editor/data" step="t6" />, document.getElementById('editor'));
}

if (window.location.pathname === '/editor/t7') {
    render(<Editor url="/editor/data" step="t7" />, document.getElementById('editor'));
}

if (window.location.pathname === '/editor/t8') {
    render(<Editor url="/editor/data" step="t8" />, document.getElementById('editor'));
}

ActiveLink.init();
