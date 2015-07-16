(function() {
    "use strict";

    // Load json data with  d3
    d3.json('data/delays_sample.json', function(data) {

        var labels = [
            'Muster roll closure to muster roll entry',
            'Muster roll entry to wage list generation',
            'Wage list generation to wage list sign',
            'Wage list sign to FTO generation',
            'FTO generation to first signature',
            'First signature to second signature',
            'Second signature to processed by bank',
        ];

        blockViz({
            data: buildDataArray(data[0].block.data),
            title: 'Block Performance',
            target: '#block_performance',
            legend_target: '.legend',
            labels: labels
        });


        // Draw stepwise charts
        for (var i = 0; i <= 8; i++) {
            if (i !== 2 && i !== 5) {
                smallViz({
                    data: buildStepArray(data, i, ['block', 'state', 'district']),
                    title: data[0].block.headers[i],
                    target: '#s_' + i,
                    legend_target: '.s_' + i + '_legend',
                    labels: labels
                });
            }
        }

    });

    //  Transform to  MD supported structure
    function buildDataArray(data) {
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


    //  Parse the "20140412" string to date object
    function parseDate(string) {
        var y = string.substring(0, 4);
        var m = string.substring(4, 6);
        var d = string.substring(6, 8);
        return new Date(y, m, d);
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
            y_scale_type: 'log',
            // y_rug: true,
            // animate_on_load: true,
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
            y_scale_type: 'log',
        });
    }


    // IIFE end
}());
