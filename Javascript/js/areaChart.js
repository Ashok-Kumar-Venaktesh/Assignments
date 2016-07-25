
    var margin = {
            top: 100,
            right: 20,
            bottom: 100,
            left: 100
        },
        width = 1400 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var area = d3.svg.area()
        .x(function(d) {
            return x(d.Year);
        })
        .y0(height)
        .y1(function(d) {
            return y(d.Growth);
        });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("../AreaChart/areaChart.json", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.Year = d.Year;
            d.Growth = +d.Growth;

            x.domain(d3.extent(data, function(d) {
                return d.Year;
            }));
            // y.domain([0, d3.max(data, function(d) { return d.Growth; })]);
            x.domain([
                d3.min(data, function(d) {
                    return d["Year"];
                }),
                d3.max(data, function(d) {
                    return d["Year"];
                })
            ]);
            y.domain([
                d3.min(data, function(d) {
                    return d["Growth"];
                }),
                d3.max(data, function(d) {
                    return d["Growth"];
                })
            ]);

            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("x", 1200)
                .attr("y", 60)
                .style("text-anchor", "end")
                .text("Year");

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Population Growth");
        });

    });

