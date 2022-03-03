const vscode = acquireVsCodeApi(); //allows us to use message passing back to the extension for tweaking parameters

const svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");

var nodes = [];
var links = [];
const repelForce = -100;
const linkLength = 100;

let zoom = d3.zoom().on("zoom", handleZoom);

function handleZoom(e) {
  d3.select(".nodes").attr("transform", e.transform);
  d3.select(".links").attr("transform", e.transform);
}

function initZoom() {
  d3.select("svg").call(zoom);
}
var simulation = d3
  .forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(-100))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("link", d3.forceLink().links(links).distance(linkLength))
  .on("tick", ticked);

window.addEventListener("message", (event) => {
  nodes = event.data.nodes;
  //console.log("nodes:" + nodes);
  links = event.data.links;
  //console.log("links" + links);
  simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(repelForce))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("link", d3.forceLink().links(links).distance(linkLength))
    .on("tick", ticked);
  initZoom();
});

// var circle = d3
//   .selectAll("circle")
//   .data(nodes)
//   .enter()
//   .append("circle")
//   .attr("class", function (d) {
//     return d.parent
//       ? d.children
//         ? "node"
//         : "node node--leaf"
//       : "node node--root";
//   })
//   .style("fill", function (d) {
//     return d.children ? color(d.depth) : null;
//   })
//   .on("click", function (event, d) {
//     console.log("clicked", d, focus, focus !== d);
//     if (focus !== d) {
//       zoom(d);
//       event.stopPropagation();
//     } else {
//       zoom(root);
//       event.stopPropagation();
//     }
//   })
//   .on("mouseover", function (d) {
//     console.log("mouseover", d);
//   });

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
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    })
    .attr("r", function (d) {
      return d.knowledgeScore;
    })
    .attr("fill", "red");
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
