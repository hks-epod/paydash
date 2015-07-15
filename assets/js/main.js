(function() {
    "use strict";

    // Load json data with  d3
    d3.json('data/delays_sample.json', function(data) {
        var headers = data[0].block.headers;
        var b_data = data[0].block.data;
        var vizData = buildDataArray(b_data);
        var labels = ['Muster roll closure to muster roll entry',
            'Muster roll entry to wage list generation',
            'Wage list generation to wage list sign',
            'Wage list sign to FTO generation',
            'FTO generation to first signature',
            'First signature to second signature',
            'Second signature to processed by bank',
        ];
        blockViz(vizData, labels);
    });


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

    // --------------------------
    //  Utility methods
    // --------------------------

    //  Parse the "20140412" string to date object
    function parseDate(string) {
        var y = string.substring(0, 4);
        var m = string.substring(4, 6);
        var d = string.substring(6, 8);
        return new Date(y, m, d);
    }

    // --------------------------
    //  Visualization Loaders
    // --------------------------
    function blockViz(data, headers) {
        MG.data_graphic({
            title: "Payment delay analysis",
            data: data,
            width: 600,
            height: 400,
            full_width: true,
            right: 40,
            target: '#p_delays',
            baselines: [{
                value: 15,
                label: 'Ideal'
            }],
            xax_count: 20,
            legend: headers,
            legend_target: '.legend',
            show_tooltips: false,
            y_extended_ticks: false,
            aggregate_rollover: true,
            animate_on_load: true,
            missing_is_hidden: false,
        });
    }



}());
