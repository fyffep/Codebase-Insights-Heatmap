const vscode = acquireVsCodeApi();

var data;
var fileData;

// window.onload = function () {
//   //   initBranchTable();
//   initFileExplorer();
// };
var fileExplorer;
var listOfBranch;
var fileNameInfo = document.getElementById("fileNameInfo");

window.addEventListener("message", (event) => {
  // console.log("Data type", event);
  switch (event.data.command) {
    // case "fileNameReceived":
    //   console.log(event.data.data);
    //   break;
    case "mapData":
      data = event.data.data;
      fileExplorer = data.fileTreeNodeList;
      console.log("data received, generating file explorer")
      initFileExplorer();
      break;
    case "fileNameReceived":
      console.log("received file data:",event.data.data);
      fileData = event.data.data;
      listOfBranch = Object.keys(fileData);
      initBranchTable();
      break;
    default:
      console.error("Unrecognized message passed to settings script:");
      console.error(event);
      break;
  }
});

//withoutd3, color scaling

function heatToColor(heat) {
  var step = 187 / 10;

  var r = 0;
  var b = 187;

  r += heat * step;
  b -= heat * step;

  return "rgb(" + r + ",0," + b + ")";
}

var hierarchy = document.getElementById("hierarchy");

var projectName = "ProjectName";

// var fileExplorer = [
//   {path: "src",
//    fileTreeNodeList: [{path: "model.ts"},{path: "modelScript.js"},{path: "d3", fileTreeNodeList: [{path: "d3.min.js"}]}] },
//   {path: "config",
//   fileTreeNodeList: [{path: "config.js"}] },
//   {path: "html",
//   fileTreeNodeList: [{path: "index.html"}, {path: "index.css"}, {path: "script.js"}] },
//   {path: "README.md"},
// ];

function initFileExplorer() {
  removeAllChildNodes(hierarchy);
  var outerFolder = document.createElement("div");
  outerFolder.setAttribute("class", "foldercontainer");
  var outerFolderName = document.createElement("span");
  outerFolderName.setAttribute("class", "folder fa-folder-o");
  outerFolderName.setAttribute("data-isexpanded", "true");
  outerFolderName.innerHTML = projectName;
  outerFolder.appendChild(outerFolderName);
  fileExplorer.forEach((item, index) => {
    if (item.fileTreeNodeList) {
      generateFolder(item, outerFolder, "");
    } else {
      generateFile(item, outerFolder, "");
    }
  });

  hierarchy.append(outerFolder);
}

function generateFolder(dict, element, folderPath) {
  let folder = document.createElement("div");
  folder.setAttribute("class", "foldercontainer");
  folderName = dict.path;

  var folderElement = document.createElement("span");

  fileList = dict.fileTreeNodeList;

  if (fileList.length > 0) {
    folderElement.setAttribute("class", "folder fa-folder-o");
    folderElement.setAttribute("data-isexpanded", "true");
    folderElement.innerHTML = folderName;
    folder.appendChild(folderElement);
    fileList.forEach((item, index) => {
      if (item.fileTreeNodeList) {
        generateFolder(item, folder, folderPath + folderName + "/");
      } else {
        generateFile(item, folder, folderPath + folderName + "/");
      }
    });
  } else {
    folderElement.setAttribute("class", "folder fa-folder");
    folderElement.innerHTML = folderName;
    folder.appendChild(folderElement);
    folder.innerHTML += '<span class="noitems">No Items</span>';
  }

  element.appendChild(folder);
}

function generateFile(fileItem, element, folderPath) {
  // console.log(folderPath);
  fileName = fileItem.filename;
  var fileElement = document.createElement("span");
  fileElement.setAttribute("class", "file fa-file-code-o");
  fileElement.setAttribute("id", fileItem.filename);
  fileElement.innerHTML = fileName;
  element.appendChild(fileElement);
}

hierarchy.addEventListener("click", function (event) {
  var elem = event.target;
  if (elem.tagName.toLowerCase() === "span" && elem !== event.currentTarget) {
    var type = elem.classList.contains("folder") ? "folder" : "file";
    if (type === "file") {
      // alert("File accessed");
      // function display a pop up
      vscode.postMessage({
        command: "fileName",
        data: elem.getAttribute("id"),
      });
      showPopup(elem.getAttribute("id"));
    }
    if (type === "folder") {
      var isexpanded = elem.dataset.isexpanded === "true";
      if (isexpanded) {
        elem.classList.remove("fa-folder-o");
        elem.classList.add("fa-folder");
      } else {
        elem.classList.remove("fa-folder");
        elem.classList.add("fa-folder-o");
      }
      elem.dataset.isexpanded = !isexpanded;

      var toggleelems = [].slice.call(elem.parentElement.children);
      var classnames = "file,foldercontainer,noitems".split(",");

      toggleelems.forEach(function (element) {
        if (
          classnames.some(function (val) {
            return element.classList.contains(val);
          })
        )
          element.style.display = isexpanded ? "none" : "block";
      });
    }
  }
});

function showPopup(filePath) {
  var fileHealthAnalysis = document.getElementById("fileHealthAnalysis");
  fileHealthAnalysis.style.visibility = "visible";
  fileNameInfo.innerHTML = "File Path: " + filePath;
  // initBranchTable();
}

// listOfBranch = ["main", "add_sound", "editor_form", "impl_nplay", "game_maker_form", "forms", "testing"];
// // listOfHeat = [2, 2.7, 3.5, 2, 2.5, 6, 4.8];
// listOfBranch = Object.keys(fileData);
// listOfBranch.forEach((item) => {
//   listOfHeat.append(fileData[item]);
// });

var branchTable = document.getElementById("branchTable");
var tbody = branchTable.getElementsByTagName("tbody")[0];

function initBranchTable() {
  // var color = d3
  //   .scaleLinear()
  //   .domain([1, 10])
  //   .range(["#0000BB", "#BB0000"])
  //   .interpolate(d3.interpolateRgb);
  removeAllChildNodes(tbody);
  listOfBranch.forEach((item, index) => {
    let trow = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdHealth = document.createElement("td");
    let h3Name = document.createElement("h3");
    h3Name.setAttribute("id", item);
    h3Name.innerHTML = item;
    tdName.appendChild(h3Name);
    console.log(heatToColor(fileData[item]));
    healthChart =
      '<svg class="drawHealth"> <rect x="30%" y="20%" class="drawRectHealth" style="fill:' +
      heatToColor(fileData[item]) +
      // "#0000BB" +
      ';"/> <text x="40%" y="50%" fill="white">Heat: ' +
      fileData[item] +
      "</text> </svg>";

    tdHealth.innerHTML += healthChart;

    trow.appendChild(tdName);
    trow.appendChild(tdHealth);

    tbody.appendChild(trow);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function searchForBranch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("branchSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("branchTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function closePopup() {
  var popup = document.getElementById("fileHealthAnalysis");
  removeAllChildNodes(tbody);
  popup.style.visibility = "hidden";
}
