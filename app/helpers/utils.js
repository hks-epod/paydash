'use strict';

var d3 = require('d3');

exports.padNum = function(num) {
    var str = num.toString();
    return str.length === 1 ? '0' + str : str;
};

// flatten but maintain the sort where obj key == array index
exports.flatten = function(obj) {
    var array = [];
    var len = Object.keys(obj).length;
    for (var i = 0; i < len; i++) {
        array.push(obj[i]);
    }
    return array;
};

exports.nestEmpMapping = function(obj) {
    return d3.nest()
        .key(function(d) {
            return d.region_code;
        })
        .rollup(function(v) {
            return v[0].task_assign === null ? false : true;
        })
        .map(exports.flatten(obj));
};

exports.nestEmpStats = function(obj) {
    return d3.nest()
        .key(function(d) {
            return d.staff_id;
        })
        .rollup(function(v) {
            return {
                'step1_avg': v[0].step1_avg,
                'total_transactions': v[0].total_transactions
            };
        })
        .map(exports.flatten(obj));
};
