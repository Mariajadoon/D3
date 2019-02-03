// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data
d3.csv("/assets/data/data.csv").then((healthData) => {
    // if (error) return console.warn("error:", error);
  
    console.log(healthData);
// parse data
    healthData.forEach((data) => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });

//      Create scale functions

var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.poverty) * 0.8, d3.max(healthData, d => d.poverty) * 1.2])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.healthcare) * 0.8, d3.max(healthData, d => d.healthcare) * 1.2])
      .range([height, 0]);

  //    Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

//Append Axes to the chart
chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

  //    Create Circles

  //var circlesGroup = chartGroup.selectAll("circle")
    //.data(healthData)
    //.enter()
    //.append("circle")
    //.attr("cx", d => xLinearScale(d.poverty))
    //.attr("cy", d => yLinearScale(d.healthcare))
    //.attr("r", "15")
    //.attr("fill", "pink")
    //.attr("opacity", ".5")
    
  //circlesGroup.append("text")
  //.text(d => {
    //return d.abbr;
  //})

  //.attr("dx", d => xLinearScale(d.poverty))
  //.attr("dy", d => yLinearScale(d.healthcare) + 15/2)
  //.attr("font-size", 50)
  //.attr("class", "stateText")


var circlesGroup = chartGroup.selectAll("g")
    .data(healthData)
    .enter()
    .append("g")
    .attr("transform", function(d){return "translate("+d.x+",80)"})
circlesGroup.append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5")
    
  circlesGroup.append("text")
  .text(d => {
    return d.abbr;
  })

  .attr("dx", d => xLinearScale(d.poverty))
  .attr("dy", d => yLinearScale(d.healthcare) + 15/2)
  .attr("font-size", 15)
  .attr("class", "stateText")


//    Create axes labels

chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  });
