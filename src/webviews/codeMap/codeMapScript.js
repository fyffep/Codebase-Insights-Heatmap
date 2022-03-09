d3.select("p").style("color", "green");
d3.select("p").append("h1").text("Hello from D3!");

window.addEventListener("message", (event) => {
  data = event.data; // The JSON data our extension sent
  console.log(data);

  var color = d3
    .scaleLinear()
    .domain([1, 10])
    .range(["#4444aa", "#ff0000"])
    .interpolate(d3.interpolateHcl);

  // var body = d3.select("body").style("background-color", color(-1));

  var svg = d3.select("svg"),
    margin = 20,
    diameter = +svg.attr("width"),
    g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + diameter / 2 + "," + diameter / 2 + ")"
      );

  // svg.style("background", color(-1));

  var pack = d3
    .pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

  var root = d3
    .hierarchy(data, (c) => {
      return c.fileTreeNodeList;
    })
    .sum(function (d) {
      return d.value ? d.value : 500;
    })
    .sort(function (a, b) {
      return b.value - a.value;
    });

  var focus = root,
    nodes = pack(root).descendants(),
    view;
  function colorCircle(d) {
    if (d.children) {
      return color(d.depth);
    }
    let latestCommit = d.latestCommitInTreeWalk;
    let heatVal = d.commitHashToHeatObjectMap[latestCommit];
    let colorVal = color((255 * heatVal) / 5, 0, (255 * (5 - heatVal)) / 5);
    return colorVal;
  }

  var circle = g
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", function (d) {
      return d.parent
        ? d.children
          ? "node"
          : "node node--leaf"
        : "node node--root";
    })
    .style("fill", function (d) {
      if (d.children) {
        return "#777777";
      }
      let latestCommit = d.data.latestCommitInTreeWalk;
      let heatVal = d.data.commitHashToHeatObjectMap[latestCommit].overallHeat;
      console.log(heatVal);
      return color(heatVal);
    })
    .on("click", function (event, d) {
      console.log("clicked", d, focus, focus !== d);
      if (focus !== d) {
        zoom(d);
        event.stopPropagation();
      } else {
        zoom(root);
        event.stopPropagation();
      }
    })
    .on("mouseover", function (d) {
      console.log("mouseover", d);
    });

  var text = g
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .style("fill-opacity", function (d) {
      return d.parent === root ? 1 : 0;
    })
    .style("display", function (d) {
      return d.parent === root ? "inline" : "none";
    })
    .text(function (d) {
      return d.children ? d.data.path : d.data.filename;
    });

  var node = g.selectAll("circle,text");

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    focus = d;

    var transition = d3
      .transition()
      .duration(d.altKey ? 7500 : 750)
      .tween("zoom", function (d) {
        var i = d3.interpolate(view, [focus.x, focus.y, focus.r * 2 + margin]);
        return function (t) {
          zoomTo(i(t));
        };
      });

    transition
      .selectAll("text")
      .filter(function (d) {
        return d.parent === focus || this.style.display === "inline";
      })
      .style("fill-opacity", function (d) {
        return d.parent === focus ? 1 : 0;
      })
      .on("start", function (d) {
        if (d.parent === focus) {
          this.style.display = "inline";
        }
      })
      .on("end", function (d) {
        if (d.parent !== focus) {
          this.style.display = "none";
        }
      });
  }

  function zoomTo(v) {
    var k = diameter / v[2];
    view = v;
    node.attr("transform", function (d) {
      return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
    });
    circle.attr("r", function (d) {
      return d.r * k;
    });
  }
});