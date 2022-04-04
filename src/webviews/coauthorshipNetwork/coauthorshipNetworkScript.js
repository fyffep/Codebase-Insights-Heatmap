const vscode = acquireVsCodeApi(); //allows us to use message passing back to the extension for tweaking parameters

const svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");

var totalLinesInCodebase; //an int used to scale circle radii
const MAX_CIRCLE_SIZE = 60; //arbitrary
var totalFilesInCodebase; //an int used to scale line width
const MAX_STROKE_WIDTH = 15; //arbitrary

var originalNodes = [];
var nodes = [];
var originalLinks = [];
var links = [];
const repelForce = -100;
const linkLength = 200;

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
  totalLinesInCodebase = event.data.totalLinesInCodebase;
  totalFilesInCodebase = event.data.totalFilesInCodebase;
  nodes = event.data.contributorList;
  originalNodes = event.data.contributorList;
  links = event.data.links;
  originalLinks = event.data.links;
  simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(repelForce))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("link", d3.forceLink().links(links).distance(linkLength))
    .on("tick", ticked);
  initZoom();
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
    })
    .attr("id", function (d) {
      return d.source.email + " " + d.target.email;
    })
    .on("click", function (d) {
      showLinkDetails(d);
    })
    .style("cursor", "pointer")
    .attr("stroke-width", function (d) {
      return (d.strength / totalFilesInCodebase) * MAX_STROKE_WIDTH;
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
      return (d.knowledgeScore / totalLinesInCodebase) * MAX_CIRCLE_SIZE;
    })
    .attr("id", function (d) {
      return d.email;
    })
    .attr("fill", "red")
    .style("cursor", "pointer")
    .on("click", function (d) {
      showAuthorDetailsFromCircle(d);
    });
  u = d3
    .select(".nodes")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .text(function (d) {
      return d.email;
    })
    .attr("x", function (d) {
      return d.x;
    })
    .attr("y", function (d) {
      return d.y;
    })
    .attr("dy", function (d) {
      return 5;
    })
    .style("cursor", "pointer")
    .on("click", function (d) {
      showAuthorDetailsFromText(d);
    });
}

function ticked() {
  updateNodes();
  updateLinks();
}

////////////////////////// CONTROL PANEL //////////////////////////

function showLinkDetails(d) {
  hideFilterButton();
  id = d.path[0].id;
  source = id.split(" ")[0];
  destination = id.split(" ")[1];
  let sourceData, destinationData;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].email === source) {
      sourceData = nodes[i].filesKnown;
    } else if (nodes[i].email === destination) {
      destinationData = nodes[i].filesKnown;
    }
  }
  let sharedFiles = [];
  for (let i = 0; i < sourceData.length; i++) {
    for (let j = 0; j < destinationData.length; j++) {
      if (sourceData[i] === destinationData[j]) {
        sharedFiles.push(sourceData[i]);
      }
    }
  }
  openNav();
  let emailH2 = document.getElementById("email");
  emailH2.innerHTML = "Files authored by " + source + " and " + destination;
  let filesList = document.getElementById("filesList");
  let filesListInnerHTMLString = "";
  for (let i = 0; i < sharedFiles.length; i++) {
    filesListInnerHTMLString += "<li>" + sharedFiles[i] + "</li>";
  }
  filesList.innerHTML = filesListInnerHTMLString;
}

function showAuthorDetailsFromCircle(d) {
  let email = d.path[0].id;
  showAuthorDetails(email);
}
function showAuthorDetailsFromText(d) {
  let email = d.path[0].innerHTML;
  showAuthorDetails(email);
}
function showAuthorDetails(email) {
  openNav();
  let emailH2 = document.getElementById("email");
  emailH2.innerHTML = email;
  showFilterButton();
  let data;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].email === email) {
      data = nodes[i].filesKnown;
    }
  }
  let filesList = document.getElementById("filesList");
  let filesListInnerHTMLString = "";
  for (let i = 0; i < data.length; i++) {
    filesListInnerHTMLString += "<li>" + data[i] + "</li>";
  }
  filesList.innerHTML = filesListInnerHTMLString;
}

function openNav() {
  let controlPanel = document.getElementById("controlPanel");
  if (controlPanel.style.width === "0px" || !controlPanel.style.width) {
    //it's undefined the first time you hit the button, which is a case where we want to set it to 250px
    controlPanel.style.width = "250px";
  } else {
    controlPanel.style.width = "0px";
    controlPanel.style.width = "250px";
  }
}
function closeNav() {
  document.getElementById("controlPanel").style.width = "0";
}
function buttonExample() {
  vscode.postMessage({
    data: "Thanks for pressing that button!",
  });
}

function showFilterButton() {
  let filterButton = d3.select("#filterButton");
  let email = document.getElementById("email").innerHTML;
  filterButton.text("filter " + email);
  filterButton.on("click", filterAuthor);
}

function hideFilterButton() {
  let filterButton = document.getElementById("filterButton");
  filterButton.innerHTML = "";
}

function clearAllFilters() {
  let clearAllFilters = document.getElementById("clearAllFilters");
  clearAllFilters.innerHTML = "";
  nodes = originalNodes;
}

function filterAuthor() {
  let clearAllFilters = document.getElementById("clearAllFilters");
  clearAllFilters.innerHTML = "Clear all author filters";
  let email = document.getElementById("email").innerHTML;
  console.log("Filtering " + email);
  newNodes = [];
  newLinks = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].email !== email) {
      newNodes.push(nodes[i]);
    }
  }
  for (let i = 0; i < links.length; i++) {
    if (links[i].source.email !== email && links[i].target.email !== email) {
      newLinks.push(links[i]);
    }
  }
  nodes = newNodes;
  links = newLinks;
}

////////////////////////// END CONTROL PANEL //////////////////////////
