var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g");

var x = d3.scale.linear().range([margin.left, width]).domain([0,10]),
    xAxis = d3.svg.axis().scale(x).tickSubdivide(true);

    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

var data = [];

function update(newData) {
    data.push(newData);

    // Join new data with old elements, if any.
    var circle = svg.selectAll("circle")
    .data(data, function(d, i){ return i;});

    console.log(circle.data());

    circle.enter().append("circle")
    .attr("r", function(d) { return Math.sqrt(d); })
    .attr("cy", 250);

    circle.attr("cx", function(d, i) { return x(i); });

    //circle.exit().remove();
}

$("#insert").click(function() {
    var data = $("#dataValue").val();
    //console.log(parseInt(data));
    update(parseInt(data));
    $("#dataValue").val("");
});
