'use strict';


exports.lines = function(data, col) {
    var result = [];
    data.forEach(function(stat, index) {
        var obj = {
            date: new Date(stat.date),
        };
        obj.value = stat[col];
        result.push(obj);
    });
    return result;
};
