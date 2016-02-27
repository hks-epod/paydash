'use strict';
var $ = require('jquery');

var OverviewPerformance = require('./performance/overview');
var DiscreatePerformance = require('./performance/discrete');

//  Load Components
require('./components/dropdown');
require('./components/region');
require('./components/active-link');


if (window.location.pathname === '/performance/overview') {
    OverviewPerformance.init();
}

// // Include Muster Dashboards scripts
// require('./musters/current');
// require('./musters/delayed');
