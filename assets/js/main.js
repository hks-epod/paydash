(function() {
    "use strict";

    // Load json data with  d3
    d3.json('data/delays_sample.json', function(data) {
        var headers = data[0].state.headers;
        var b_data = data[0].district.data;
        var vizData = buildDataArray(b_data);
        var labels = ['Muster roll closure to muster roll entry',
            'Muster roll entry to wage list generation',
            'Wage list generation to wage list sign',
            'Wage list sign to FTO generation',
            'FTO generation to first signature',
            'First signature to second signature',
            'Second signature to processed by bank',
        ];
        viz(vizData, labels);
    });


    function buildDataArray(data) {
        var result = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        data.forEach(function(dateArr, index) {

            var s0 = dateArr[0];
            var s1 = s0 + dateArr[1];
            var s2 = s1 + dateArr[8];
            var s3 = s2 + dateArr[3];
            var s4 = s3 + dateArr[6];
            var s5 = s4 + dateArr[4];
            var s6 = s5 + dateArr[7];

            var obj_0 = {
                value: s0,
                date: parseDate(dateArr[5]),
            };
            var obj_1 = {
                value: s1,
                date: parseDate(dateArr[5]),
            };
            var obj_2 = {
                value: s2,
                date: parseDate(dateArr[5]),
            };
            var obj_3 = {
                value: s3,
                date: parseDate(dateArr[5]),
            };
            var obj_4 = {
                value: s4,
                date: parseDate(dateArr[5]),
            };
            var obj_5 = {
                value: s5,
                date: parseDate(dateArr[5]),
            };
            var obj_6 = {
                value: s6,
                date: parseDate(dateArr[5]),
            };

            // Push objcts to lines
            result[0].push(obj_0);
            result[1].push(obj_1);
            result[2].push(obj_2);
            result[3].push(obj_3);
            result[4].push(obj_4);
            result[5].push(obj_5);
            result[6].push(obj_6);
        });
        return result;
    }

    //  Parse the date string to date object
    function parseDate(string) {
        var y = string.substring(0, 4);
        var m = string.substring(4, 6);
        var d = string.substring(6, 8);
        return new Date(y, m, d);
    }

    //  Load MG chart
    function viz(data, headers) {
        MG.data_graphic({
            title: "Payment delay analysis",
            data: data,
            width: 600,
            height: 400,
            full_width: true,
            right: 40,
            target: '#fake_users2',
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
        });
    }



}());
