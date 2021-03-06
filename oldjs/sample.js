function sortByDate(reviews){
  return reviews.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
  });
};

d3.json("smallReview.json", function(d) {
  mainvisdata = d

//Parse the date
var parseDate = d3.time.format("%Y-%m-%d").parse;

var sortedData = sortByDate(mainvisdata["vcNAWiLM4dR7D2nwwJ7nCA"]);

  var minDate = parseDate(sortedData[0]["date"]);
  var maxDate = parseDate(sortedData[sortedData.length-1]["date"]);

  //Set dimensions of canvas and graph
var margin = {top: 40, right: 40, bottom: 40, left:40},
    width = 600,
    height = 500;

//Set ranges
var x = d3.time.scale()
    .domain([minDate, d3.time.day.offset(maxDate, 1)])
    .rangeRound([0, width - margin.left - margin.right]);

var y = d3.scale.linear()
    .domain([0, 5])
    .range([height - margin.top - margin.bottom, 0]);

//Define the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.days, 1)
    .tickFormat(d3.time.format('%b %e %Y'))
    .tickValues(x.domain())
    .tickSize(0)
    .tickPadding(8);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .tickPadding(8)
    .ticks(5);

//Add the svg canvas
var svg = d3.select('body').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  //Add the scatterplot
  svg.selectAll("dot")
      .data(sortedData)
    .enter().append("circle")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(parseDate(d.date)); })
      .attr("cy", function(d) { return y(d.stars); });

  //Add the X axis
  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
      .call(xAxis);

  //Add the Y axis
  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);
});

