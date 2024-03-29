var width = 500;
var height = 250;
var margin = {top: 25, left: 25, right: 25, bottom: 25};

var svg = d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",height);

var data = [
  {x: "8C", y: 2.2},
  {x: "8V", y: 10.4},
  {x: "10C", y: 4.2},
  {x: "10V", y: 21.7},
  {x: "12C", y: 7.6},
  {x: "12V", y: 26.7},
  {x: "CC", y: 6.8},
  {x: "CV", y: 21.3},
  {x: "YAC", y: 12.3},
  {x: "YAV", y: 17.1}
];

var xScale = d3.scaleBand()
  .domain(["8C","8V","10C","10V","12C","12V","CC","CV","YAC","YAV"])
  .rangeRound([margin.left, width-margin.right])
  .padding(0.5);

var yScale = d3.scaleLinear()
  .domain([0,30])
  .range([height-margin.bottom, margin.top]);

var xAxis = svg.append("g")
  .attr("transform",`translate(0,${height-margin.bottom})`)
  .call(d3.axisBottom().scale(xScale));

var yAxis = svg.append("g")
  .attr("transform",`translate(${margin.left},0)`)
  .call(d3.axisLeft().scale(yScale));

var bar = svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x",function(d) { return xScale(d.x); })
    .attr("y", function(d) { return yScale(d.y); })
    .attr("width",xScale.bandwidth())
    .attr("height", function(d) { return height - margin.bottom - yScale(d.y); })
    .attr("fill","#CC0000")
    .on("mouseover", function() {
      d3.select(this)
        .attr("fill","black");
    }).on("mouseout", function() {
      d3.select(this)
        .attr("fill","#CC0000");
    })
