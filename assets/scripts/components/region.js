'use strict';

var $ = require('jquery');
var Cookie = require('../lib/cookie');

var active_region = Cookie.read('active_region');

if (active_region) {
    $('#region_selector option[value="' + active_region + '"]').attr('selected', 'selected');
} else {
    setCookie($('#region_selector option')[0].value);
    location.reload();
}

//  Set cookie on change 
$('#region_selector').on('change', function(ele) {
    setCookie(ele.target.value);
    location.reload();
});


function setCookie(value) {
    document.cookie = 'active_region=' + value + ';Path=/;';
}
