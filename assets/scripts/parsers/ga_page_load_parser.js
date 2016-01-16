'use strict';

//  Parse the "20140412" string to date object
function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6);
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

exports.lines = function(data) {
    var result = {};
    data.forEach(function(stat, index) {
        var obj = {
            date: parseDate(stat[0]),
            value: stat[2]
        };
        if (result[stat[1]]) {
            result[stat[1]].push(obj);
        } else {
            result[stat[1]] = [obj];
        }
    });
    return result;
};
