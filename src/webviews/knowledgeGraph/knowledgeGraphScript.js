const svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");

var nodes = [];
var links = [];


var simulation = d3
  .forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(-100))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("link", d3.forceLink().links(links))
  .on("tick", ticked);

window.addEventListener("message", (event) => {
  nodes = event.data.nodes;
  //console.log("nodes:" + nodes);
  links = event.data.links;
  //console.log("links" + links);
  simulation = d3
  .forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(-100))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("link", d3.forceLink().links(links))
  .on("tick", ticked);

});

function updateLinks() {
  var u = d3
    .select(".links")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });
}

function updateNodes() {
  u = d3
    .select(".nodes")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .text(function (d) {
      return d.name;
    })
    .attr("x", function (d) {
      return d.x;
    })
    .attr("y", function (d) {
      return d.y;
    })
    .attr("dy", function (d) {
      return 5;
    });
}

function ticked() {
  updateNodes();
  updateLinks();
}
