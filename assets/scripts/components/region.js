'use strict';

var $ = require('jquery');
var Cookie = require('../lib/cookie');

exports.init = function() {

    var active_region = Cookie.read('active_region');

    $('#region_selector option[value="' + active_region + '"]').attr('selected', 'selected');

     console.log('sdsd');
    //  Set cookie on change 
    $('#region_selector').on('change', function(ele) {
        document.cookie = 'active_region=' + ele.target.value;
       
        location.reload();
    });
};
