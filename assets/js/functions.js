(function() {
  "use strict";

  var data = [
    ["20140426", 12.5, 0.27, 406, 0.73, 0.0, 0.0, 1.0, 0.0],
    ["20140522", 17.75, 5.0, 88, 1.0, 0.0, 0.0, 1.0, 0.0],
    ["20140523", 9.0, 0.0, 38, 7.0, 0.0, 0.0, 1.0, 0.0],
    ["20140604", 16.37, 0.0, 27, 0.0, 0.0, 0.0, 1.0, 1.0],
    ["20140616", 17.31, 1.0, 117, 1.0, 0.0, 0.0, 2.0, 0.0],
    ["20140625", 17.0, 1.0, 12, 4.0, 5.0, 0.0, 1.0, 1.0],
    ["20140627", 10.0, 1.0, 28, 10.0, 0.0, 1.0, 1.0, 1.0],
    ["20140823", 18.0, 0.0, 18, 33.0, 9.0, 11.0, 3.0, 0.0],
    ["20140828", 67.89, 4.86, 36, 0.0, 0.0, 0.0, 1.0, 0.0],
    ["20140922", 26.64, 4.88, 430, 4.37, 15.15, 1.81, 1.95, 4.36],
    ["20140923", 30.0, 6.0, 5, 0.0, 17.0, 1.0, 1.0, 36.0],
    ["20141018", 25.0, 20.0, 1, 0.0, 1.0, 6.0, 1.0, 0.0],
    ["20141215", 22.1, 15.13, 78, 2.31, 3.05, 4.46, 59.0, 6.92],
    ["20150127", 27.67, 0.0, 21, 5.0, 1.0, 10.0, 12.0, 0.0],
    ["20150305", 176.0, 13.0, 3, 5.0, 0.0, 55.0, 5.0, 0.0],
    ["20150323", 27.0, 73.0, 7, 1.0, 0.0, 0.0, 3.0, 6.0],
    ["20150324", 28.0, 73.0, 2, 1.0, 0.0, 0.0, 4.0, 6.0],
    ["20150330", 27.05, 102.67, 132, 1.0, 0.0, 0.0, 1.0, 0.81]
  ];

  // Build Line Data
  function parseLines(data, past_n_days, col, isCumulative) {
    if (past_n_days !== '') {
      var past_n_date = new Date();
      past_n_date.setDate(past_n_date.getDate() - past_n_days);
    }
    var result = [];
    data.forEach(function(tSmry, index) {
      if (!past_n_date || parseDate(tSmry[0]) >= past_n_date) {
        col.forEach(function(val, index) {
          var obj = {
            date: parseDate(tSmry[0]),
          };
          obj.value = (isCumulative && result[index]) ? tSmry[val] + result[index][result[index].length - 1].value : tSmry[val];
          result[index] = result[index] || [];
          result[index].push(obj);
        });
      }
    });
    return result;
  }


  //  Parse the "20140412" string to date object
  function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6);
    var d = string.substring(6, 8);
    return new Date(y, m, d);
  }



  console.log(parseLines(data, 130, [1], true));


  // IIFE end
}());
