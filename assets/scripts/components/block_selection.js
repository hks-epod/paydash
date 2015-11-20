'use strict';
var $ = require('jquery');

//  Setup cookie for block selection

function read_cookie(key) {
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}

var block_id = read_cookie('block_id');

$('#block_selector option[value="' + block_id + '"]').attr('selected', 'selected');



$('#block_selector').on('change', function(ele) {
    document.cookie = 'block_id=' + ele.target.value;
    location.reload();
});
