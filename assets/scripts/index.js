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

if (window.location.pathname === '/musters/current') {

    require('./components/cards.jsx');
}

if (window.location.pathname === '/login') {
    document.cookie = 'active_region=;Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
