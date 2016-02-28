'use strict';

require('./components/dropdown');
require('./components/region');
require('./components/active-link');

var OverviewPerformance = require('./performance/overview');
var DiscretePerformance = require('./performance/discrete');

if (window.location.pathname === '/performance/overview') {
    OverviewPerformance.init();
}
if (window.location.pathname === '/performance/discrete') {
    DiscretePerformance.init();
}

// // Include Muster Dashboards scripts
// require('./musters/current');
// require('./musters/delayed');
