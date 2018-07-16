 transactionsData.forEach(function(d) {
        d.date = parseDate(d.date);
        console.log(d.date);
    });

    let dateDim = ndx.dimension(dc.pluck("date"));

    let minDate = dateDim.bottom(1)[0].date;
    let maxDate = dateDim.top(1)[0].date;

    let tomSpend = dateDim.group().reduceSum(function(d) {
        if (d.name === "Tom") {
            return +d.spend;
            //the plus sign forces the return to be a nº
        }
        else {
            return 0;
        }
    });

    let aliceSpend = dateDim.group().reduceSum(function(d) {
        if (d.name === "Alice") {
            return +d.spend;
            //the plus sign forces the return to be a nº
        }
        else {
            return 0;
        }
    });

    let bobSpend = dateDim.group().reduceSum(function(d) {
        if (d.name === "Bob") {
            return +d.spend;
            //the plus sign forces the return to be a nº
        }
        else {
            return 0;
        }
    });

    let compositeChart = dc.compositeChart("#composite-chart")

    compositeChart
        .width(1000)
        .height(200)
        .dimension(dateDim)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .yAxisLabel("Spend")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
            .colors("lightgreen")
            .group(tomSpend, "Tom"),
            dc.lineChart(compositeChart)
            .colors("violet")
            .group(bobSpend, "Bob"),
            dc.lineChart(compositeChart)
            .colors("indigo")
            .group(aliceSpend, "Alice")
        ])
        .render()
        .yAxis().ticks(4);
    dc.renderAll();

    