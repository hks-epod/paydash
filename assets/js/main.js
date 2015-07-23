(function() {
  "use strict";

  var paydash = {
    past_n_days: '',
    stepwise_compare_lines: ['block', 'state', 'district'],
    labels: [
      'Muster roll closure to muster roll entry',
      'Muster roll entry to wage list generation',
      'Wage list generation to wage list sign',
      'Wage list sign to FTO generation',
      'FTO generation to first signature',
      'First signature to second signature',
      'Second signature to processed by bank',
    ],
    stepCols: [1, 2, 3, 4, 5, 6, 7]
  };

  // Load JSON
  d3.json('data/delays_sample.json')
    .on("progress", function() {
      console.info("progress", d3.event.loaded);
    })
    .get(function(error, data) {
      init(data);
    });

  // Intialisation function
  function init(data) {
    paydash.data = data;
    // Prepare and draw block performance chart
    drawBlockPerformance();
    drawStepwisePerformance(); 
  }

  // Time period Selection
  d3.selectAll(".modify-time-period-controls button").on("click", function() {
    var target = d3.select(d3.event.target); // Define target
    d3.selectAll(".modify-time-period-controls button").classed("selected", false); // change button state
    target.classed("selected", true);
    paydash.past_n_days = target.attr("data-timeperiod");
    drawBlockPerformance(); // Draw block performance chart
    drawStepwisePerformance(); 
  });

  //Stepwise charts step selection
  d3.selectAll(".blockSelector").on("click", function() {
    paydash.stepwise_compare_lines = [];
    d3.selectAll(".blockSelector").each(function() {
      if (this.checked === true) {
        paydash.stepwise_compare_lines.push(this.value);
      }
    });
    drawStepwisePerformance(); 
  });









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
          obj.value = (isCumulative && result[index - 1]) ? tSmry[val] + result[index - 1][result[index - 1].length - 1].value : tSmry[val];
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

  //  Specific Charts
  function drawBlockPerformance() {
    var b_data = parseLines(paydash.data.block.data, paydash.past_n_days, paydash.stepCols, true);
    detailViz({
      data: b_data,
      title: 'Block Performance',
      target: '#block_performance',
      legend_target: '.legend',
      labels: paydash.labels
    });
  }

  function drawStepwisePerformance() {
    paydash.stepCols.forEach(function(val, i) {
      var s_data =[];
      paydash.stepwise_compare_lines.forEach(function(stepwise_compare_line, index){
        var line_data = parseLines(paydash.data[stepwise_compare_line].data, paydash.past_n_days, [val], false);
        s_data.push(line_data[0]);  // Workaround to append region data
      });

      smallViz({
        data: s_data,
        title: paydash.data.config.headers[val],
        target: '#s_' + val,
        legend_target: '.s_' + val + '_legend',
        labels: paydash.labels
      });
    });
  }


  // Block Performance viz
  function detailViz(options) {
    MG.data_graphic({
      title: options.title,
      data: options.data,
      width: 600,
      height: 400,
      full_width: true,
      target: options.target,
      baselines: [{
        value: 15,
        label: 'Ideal'
      }],
      xax_count: 20,
      legend: options.labels,
      legend_target: options.legend_target,
      show_tooltips: false,
      aggregate_rollover: true,
      show_year_markers: true,
      transition_on_update: false,
      interplate: 'linear',
      interpolate_tension: 1,
      area: true,
      // missing_is_hidden: true,
      // missing_is_zero: true,
    });
  }

  // Small Viz
  function smallViz(options) {
    MG.data_graphic({
      title: options.title,
      data: options.data,
      width: 295,
      height: 150,
      right: 10,
      small_text: true,
      xax_count: 1,
      target: options.target,
      full_width: true,
      transition_on_update: false,
      max_y: 400,
    });
  }

  // IIFE end
}());
