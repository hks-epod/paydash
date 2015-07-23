(function() {
  "use strict";

  // Global state holder for the dashbaord  
  var paydash = {
    past_n_days: '',
    lines: ['block', 'state', 'district'],
    labels: [
      'Muster roll closure to muster roll entry',
      'Muster roll entry to wage list generation',
      'Wage list generation to wage list sign',
      'Wage list sign to FTO generation',
      'FTO generation to first signature',
      'First signature to second signature',
      'Second signature to processed by bank',
    ]
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
    // Draw block performance chart
    paydash.blockData = buildBlockData(paydash.data[0].block.data);

    blockViz({
      data: paydash.blockData,
      title: 'Block Performance',
      target: '#block_performance',
      legend_target: '.legend',
      labels: paydash.labels
    });
    // Draw stepwise charts
    drawBlockwiseCharts(paydash.lines);

    // Build templates for panchayatdata
    chartTemplate(paydash.data[0].panchayat);

  }

  // Time period Selection
  d3.selectAll(".modify-time-period-controls button").on("click", function() {
    var target = d3.select(d3.event.target);
    paydash.past_n_days = target.attr("data-timeperiod");
    var data = modify_time_period(paydash.blockData, paydash.past_n_days);

    // change button state
    d3.selectAll(".modify-time-period-controls button").classed("selected", false);
    target.classed("selected", true);
    blockViz({
      data: data,
      title: 'Block Performance',
      target: '#block_performance',
      legend_target: '.legend',
      labels: paydash.labels
    });
    drawBlockwiseCharts(paydash.lines, paydash.past_n_days);
  });

  // Stepwise charts step selection
  d3.selectAll(".blockSelector").on("click", function() {
    paydash.lines = [];
    d3.selectAll(".blockSelector").each(function() {
      if (this.checked === true) {
        paydash.lines.push(this.value);
      }
    });
    drawBlockwiseCharts(paydash.lines, paydash.past_n_days);
  });

  // Draw block wise charts
  function drawBlockwiseCharts(lines, past_n_days) {
    for (var i = 0; i <= 8; i++) {
      if (i !== 2 && i !== 5) {
        var data = paydash.past_n_days === '' ? buildStepArray(paydash.data, i, lines) : modify_time_period(buildStepArray(paydash.data, i, lines), past_n_days);

        smallViz({
          data: data,
          title: paydash.data[0].block.headers[i],
          target: '#s_' + i,
          legend_target: '.s_' + i + '_legend',
          labels: paydash.labels
        });
      }
    }
  }

  //  Transform to  MD supported structure
  function buildBlockData(data) {
    var result = [];
    data.forEach(function(dateArr, index) {
      // Cumulate step time
      var s0 = dateArr[0],
        s1 = s0 + dateArr[1],
        s2 = s1 + dateArr[8],
        s3 = s2 + dateArr[3],
        s4 = s3 + dateArr[6],
        s5 = s4 + dateArr[4],
        s6 = s5 + dateArr[7],
        columnIndex = [s0, s1, s2, s3, s4, s5, s6];
      for (var i = 0; i <= 6; i++) {
        var obj = {
          value: columnIndex[i],
          date: parseDate(dateArr[5]),
        };
        result[i] = result[i] || [];
        result[i].push(obj);
      }
    });
    return result;
  }

  //  Transfrom step data
  function buildStepArray(data, col, regions) {
    var result = [];
    regions.forEach(function(region, i) {
      var f_data = data[0][region].data;
      f_data.forEach(function(dateArr, index) {
        var obj = {
          value: dateArr[col],
          date: parseDate(dateArr[5]),
        };
        result[i] = result[i] || [];
        result[i].push(obj);
      });
    });
    return result;
  }

  function drawPanchayatCharts(){

  }


  function chartTemplate(data) {
    d3.select('.panchayat_charts-container').selectAll('div')
      .data(data)
      .enter().append("div")
      .classed("pure-u-6-24", true)
      .html(function(d, index) {
        return '<div class="chart-holder small_chart">' +
          '<div id="p_' + d.panchayat_code + '0"></div>' +
          '<div class="p_' + d.panchayat_code + '_legend">' + d.panchayat_name + '</div>' +
          '</div>';
      });

  }



  // Time filter
  function modify_time_period(data, past_n_days) {
    if (past_n_days !== '') {
      var fdata = [];
      var d = new Date();
      d.setDate(d.getDate() - past_n_days);
      data.forEach(function(line) {
        line = line.filter(function(obj) {
          return obj.date >= d ? true : false;
        });
        fdata.push(line);
      });
      return fdata;
    }
    return data;
  }

  //  Parse the "20140412" string to date object
  function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6);
    var d = string.substring(6, 8);
    return new Date(y, m, d);
  }

  function getMax(data) {
    var max = 30;
    data.forEach(function(line) {
      line.forEach(function(obj) {
        max = obj.value >= max ? obj.value : max;
      });
    });
    return max;
  }

  // Block Performance viz
  function blockViz(options) {
    MG.data_graphic({
      title: options.title,
      data: options.data,
      width: 600,
      height: 400,
      full_width: true,
      right: 40,
      target: options.target,
      baselines: [{
        value: 15,
        label: 'Ideal'
      }],
      xax_count: 20,
      legend: options.labels,
      legend_target: options.legend_target,
      show_tooltips: false,
      y_extended_ticks: false,
      aggregate_rollover: true,
      linked: true,
      show_year_markers: true,
      animate_on_load: false,
      transition_on_update: false,
      interplate: 'linear',
      interpolate_tension: 1,
      area:true,
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
