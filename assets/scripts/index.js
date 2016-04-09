'use strict';

require('./components/dropdown');
require('./components/region');
require('./components/active-link');

var OverviewPerformance = require('./performance/overview');
var DiscretePerformance = require('./performance/discrete');
var currentMusters = require('./musters/current');
var delayedMusters = require('./musters/delayed');

// if (window.location.pathname === '/performance/overview') {
//     OverviewPerformance.init();
// }
if (window.location.pathname === '/performance/discrete') {
    DiscretePerformance.init();
}

if (window.location.pathname === '/musters/current') {
    currentMusters.init();
}

if (window.location.pathname === '/musters/delayed') {
    delayedMusters.init();
}

if (window.location.pathname === '/logout') {
    document.cookie = 'active_region=; expires='+ new Date();
}
