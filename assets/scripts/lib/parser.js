'use strict';

//  Parse the "20140412" string to date object
function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6) - 1;
    var d = string.substring(6, 8);
    return new Date(y, m, d);
}

// Parser function to parse data
//  Input data format ::
//  [[20140426, 23, 24,12, 14, 18, 19, 34, 890 ][...][...][...][...]]
//  Output data format
//  Metrices Grpahics supported data format

//  Parameters ::
//  data - data
//  past_n_days - Parser and return data for past n days
//  col - which all coulmns/lines to return in resultsed data 
//  isCumulative - if resulted data columns are cumulative or not

exports.lines = function(options) {

    const defaults = {
        past_n_days: '',
        col: [1, 2, 3, 4, 5, 6, 7],
        isCumulative: true
    };
    if (!options) {
        options = {};
    }
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }

    if (options.past_n_days !== '') {
        var past_n_date = new Date();
        past_n_date.setDate(past_n_date.getDate() - options.past_n_days);
    }
    var result = [];
    options.data.forEach(function(tSmry, index) {
        if (!past_n_date || parseDate(tSmry[0]) >= past_n_date) {
            options.col.forEach(function(val, index) {
                var obj = {
                    date: parseDate(tSmry[0]),
                };
                obj.value = (options.isCumulative && result[index - 1]) ? tSmry[val] + result[index - 1][result[index - 1].length - 1].value : tSmry[val];
                obj.total_trans = tSmry[8];
                result[index] = result[index] || [];
                result[index].push(obj);
            });
        }
    });
    return result;
};
