'use strict';
var d3 = require('d3');

// Global state
var paydash = {
    past_n_days: '',
    stepwise_compare_lines: ['block'],
    panchyat_compare_lines: '',
    panchayatGroupBy: 'Sub-Engineer',
    labels: [
        'Muster roll closure to muster roll entry',
        'Muster roll entry to wage list generation',
        'Wage list generation to wage list sign',
        'Wage list sign to FTO generation',
        'FTO generation to first signature',
        'First signature to second signature',
        'Second signature to processed by bank',
    ],
    stepCols: [1, 2, 3, 4, 5, 6, 7]
};
// Load JSON
d3.json('/dashboard/block/data')
    .on('progress', function() {
        console.info('progress', d3.event.loaded);
    })
    .get(function(error, data) {
        console.log(data);
    });
