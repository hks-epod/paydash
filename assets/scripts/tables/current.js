'use strict';

var dynatable = require('../components/dynatable');
var $ = require('jquery');



function currentTableInit() {

    $('#my-final-table').dynatable({
        dataset: {
            records: [{
                'band': 'Weezer',
                'song': 'El Scorcho'
            }, {
                'band': 'Chevelle',
                'song': 'Family System'
            }]
        }
    });
}


if (window.location.pathname === '/musters/current') {
    currentTableInit();
}
