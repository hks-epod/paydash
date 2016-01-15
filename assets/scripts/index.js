var $ = require('jquery');

//  Load components
require('./components/dropdown');
require('./components/block_selection');
require('./components/active-link');

// Include Performance Dashboards scripts
require('./performance/block');
require('./performance/panchayat');

// Include Muster Dashboards scripts
require('./musters/current');
require('./musters/delayed');

// Include Monitor Dashboards scripts
require('./monitor/user');
require('./monitor/server');

