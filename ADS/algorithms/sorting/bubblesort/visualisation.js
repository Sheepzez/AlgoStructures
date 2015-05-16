// Utility Functions

// unwrapInner function
// http://wowmotty.blogspot.com/2012/07/jquery-unwrapinner.html
jQuery.fn.extend({
    unwrapInner: function(selector) {
        return this.each(function() {
            var t = this,
            c = $(t).children(selector);
            if (c.length === 1) {
                c.contents().appendTo(t);
                c.remove();
            }
        });
    }
});

function highlightLine(lineNum) {
    var line = "#line" + lineNum;
    $(line).wrapInner("<mark></mark>");
}

function removeHighlightLine(lineNum) {
    var line = "#line" + lineNum;
    $(line).unwrapInner();
}

//End utility functions

var data = [];

/* Initialise the SVG graph */
var margin = {top: 20, right: 20, bottom: 30, left: 20},
width = 650 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g");

var x = d3.scale.linear().range([margin.left, width]).domain([0,5]),
xAxis = d3.svg.axis().scale(x).tickSubdivide(false);

svg.append("g")
.attr("class", "x-axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);
/* End SVG init */

/* Update graph with elements in 'data' array */
function update() {
    // Update the Axis
    var x = d3.scale.linear().range([margin.left, width]).domain([0,data.length]),
    xAxis = d3.svg.axis().scale(x).tickSubdivide(false);

    svg.selectAll("g.x-axis")
    .call(xAxis);

    // Join new data with old elements, if any.
    var circle = svg.selectAll("circle")
    .data(data, function(d, i){ return i;});

    circle.enter().append("circle")
    .attr("r", function(d) { return Math.sqrt(d); })
    .attr("cy", 250);

    circle.attr("cx", function(d, i) { return x(i); });

    circle.exit().remove();
}

function sortVis() {
    var i = 0;

    //Anonymous function allows setTimeout to call this recursively.
    (function () {
            var j, value;

            for (j = length; j > i; j--) {
                if (data[j] < data[j - 1]) {
                    value = data[j];
                    data[j] = data[j - 1];
                    data[j - 1] = value;
                }
            }

            i++;
            console.log(data);
            update();

            if (i < length) {
                setTimeout(arguments.callee, 0);
            }

        })();

}




//Button bindings:

$("#insert").click(function() {
    var newData = $("#dataValue").val();
    data.push(parseInt(newData));
    update();
    $("#dataValue").val("");
});

$("#delete").click(function() {
    var delData = $("#dataValue").val();
    var i = data.indexOf(parseInt(delData));
    if(i != -1) {
        data.splice(i, 1);
    }
    update();
    $("#dataValue").val("");
});

$("#sort").click(function() {
    sortVis();
});

$("#update").click(function() {
    update();
});
