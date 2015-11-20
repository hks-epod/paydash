'use strict';
var $ = require('jquery');

var read_cookie = require('./read_cookie');

var selected_block_id = read_cookie('selected_block_id');
$('#block_selector option[value="' + selected_block_id + '"]').attr('selected', 'selected');


//  Set cookie on change 
$('#block_selector').on('change', function(ele) {
    document.cookie = 'selected_block_id=' + ele.target.value;
    location.reload();
});
