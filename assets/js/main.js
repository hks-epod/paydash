(function() {
  "use strict";
  // Global state
  var paydash = {
    past_n_days: '',
    // stepwise_compare_lines: ['block', 'state', 'district'],
    stepwise_compare_lines: ['block'],
    panchyat_compare_lines: '',
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
    drawBlockPerformance();
    drawStepwisePerformance();
    chartTemplate(paydash.data.panchayats);
    drawPanchayatPerformance();
  }
  // Time period Selection
  d3.selectAll(".modify-time-period-controls button").on("click", function() {
    var target = d3.select(d3.event.target); // Define target
    d3.selectAll(".modify-time-period-controls button").classed("selected", false); // change button state
    target.classed("selected", true);
    paydash.past_n_days = target.attr("data-timeperiod");
    drawBlockPerformance(); // Draw block performance chart
    drawStepwisePerformance();
    drawPanchayatPerformance();
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
  // panchayat_step_controls
  d3.selectAll("#panchayat_step_controls").on("change", function() {
    paydash.panchyat_compare_lines = d3.event.target.value;
    drawPanchayatPerformance();
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
          obj.total_trans = tSmry[8];
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
  // Get Maximum for stewise charts
  function getMaxofSteps() {
    if (paydash.past_n_days !== '') {
      var past_n_date = new Date();
      past_n_date.setDate(past_n_date.getDate() - paydash.past_n_days);
    }
    var max = 10;
    paydash.stepwise_compare_lines.forEach(function(stepwise_compare_line, index) {
      paydash.data[stepwise_compare_line].data.forEach(function(arr) {
        paydash.stepCols.forEach(function(val) {
          if (!past_n_date || parseDate(arr[0]) >= past_n_date) {
            if (arr[val] > max) {
              max = arr[val];
            }
          }
        });
      });
    });
    return max;
  }
  //  Prepare panchayat chart templates
  function chartTemplate(data) {
    d3.select('.panchayat_charts-container').selectAll('div')
      .data(data)
      .enter().append("div")
      .classed("pure-u-6-24", true)
      .html(function(d, index) {
        return '<div class="chart-holder small_chart">' +
          '<div id="p_' + d.panchayat_code + '"></div>' +
          '<div class="p_' + d.panchayat_code + '_legend"></div>' +
          '</div>';
      });
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
    var max_y = getMaxofSteps();
    paydash.stepCols.forEach(function(val, i) {
      var s_data = [];
      paydash.stepwise_compare_lines.forEach(function(stepwise_compare_line, index) {
        var line_data = parseLines(paydash.data[stepwise_compare_line].data, paydash.past_n_days, [val], false);
        s_data.push(line_data[0]); // Workaround to append region data
      });
      smallViz({
        data: s_data,
        title: paydash.data.config.headers[val],
        target: '#s_' + val,
        legend_target: '.s_' + val + '_legend',
        labels: paydash.labels,
        // max_y: max_y,
        area: false
      });
    });
  }
  //  Specific Charts
  function drawPanchayatPerformance() {
    paydash.data.panchayats.forEach(function(panchayat, p_index) {
      var p_step_lines = (paydash.panchyat_compare_lines !== '') ? [paydash.panchyat_compare_lines] : paydash.stepCols;
      var isCumu = (paydash.panchyat_compare_lines === '') ? true : false;
      var p_data = parseLines(panchayat.data, paydash.past_n_days, p_step_lines, isCumu);
      smallViz({
        data: p_data,
        title: panchayat.panchayat_name,
        target: '#p_' + panchayat.panchayat_code,
        legend_target: '.p_' + panchayat.panchayat_code + '_legend',
        labels: paydash.labels,
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
      left: 80,
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
      y_label: 'Days',
      mouseover: function(d, i) {
        d.values.forEach(function(val, index) {
          var prefix = d3.formatPrefix(val.value);
          var l_span = d3.select('.legend ' + '.mg-line' + val.line_id + '-legend-color');
          console.log(d);
          l_span.text(' ');
          l_span.text('— ' + paydash.labels[index] + ' : ' + prefix.scale(val.value).toFixed(2));
          d3.select('#total_trans').text(val.total_trans);
        });
      },
      mouseout: function(d, i) {
        d.values.forEach(function(val, index) {
          var l_span = d3.select('.legend ' + '.mg-line' + val.line_id + '-legend-color');
          l_span.text(' ');
          l_span.text('— ' + paydash.labels[index]);
        });
      }

    });
  }
  // Small Viz
  function smallViz(options) {
    MG.data_graphic({
      title: options.title,
      data: options.data,
      width: 295,
      height: 200,
      right: 10,
      left: 80,
      small_text: true,
      xax_count: 1,
      target: options.target,
      full_width: true,
      transition_on_update: false,
      max_y: options.max_y || undefined,
      interplate: 'linear',
      interpolate_tension: 1,

      y_label: 'Days',
      area: options.area
    });
  }

  // IIFE end
}());
