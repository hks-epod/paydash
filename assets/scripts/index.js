'use strict';

require('./components/dropdown');
require('./components/region');
require('./components/active-link');

var OverviewPerformance = require('./performance/overview');
// var DiscreatePerformance = require('./performance/discrete');

if (window.location.pathname === '/performance/overview') {
    OverviewPerformance.init();
}

// // Include Muster Dashboards scripts
// require('./musters/current');
// require('./musters/delayed');
