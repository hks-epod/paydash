d3.json('data/fake_users2.json', function(data) {
    for (var i = 0; i < data.length; i++) {
        data[i] = MG.convert.date(data[i], 'date');
    }

    MG.data_graphic({
        title: "Multi-Line Chart",
        description: "This line chart contains multiple lines.",
        data: data,
        width: 600,
        height: 400,
        full_width: true,
        right: 40,
        target: '#fake_users2',
        legend: ['Line 1','Line 2','Line 3'],
        legend_target: '.legend',
        show_tooltips: false,
        y_extended_ticks: true,
    });
});