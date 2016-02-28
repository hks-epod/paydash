'use strict';

//  Parse the "20140412" string to date object
function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6);
    var d = string.substring(6, 8);
    return new Date(y, m, d);
}


exports.discreteLimits = function(internals) {
    if (internals.past_n_days !== '') {
        var past_n_date = new Date();
        past_n_date.setDate(past_n_date.getDate() - internals.past_n_days);
    }
    var limit = {
        max_y: 10,
        max_x: new Date(),
        min_x: new Date()
    };
    internals.data.discrete.forEach(function(region, index) {
        region.data.forEach(function(arr) {
            internals.stepCols.forEach(function(val) {
                if (!past_n_date || parseDate(arr[0]) >= past_n_date) {
                    if (parseDate(arr[0]) > limit.max_x) {
                        limit.max_x = parseDate(arr[0]);
                    }
                    if (parseDate(arr[0]) < limit.max_x) {
                        limit.min_x = parseDate(arr[0]);
                    }
                    //  calculate max y 
                    if (arr[val] > limit.max_y) {
                        limit.max_y = arr[val];
                    }
                }
            });
        });
    });
    return limit;
};
