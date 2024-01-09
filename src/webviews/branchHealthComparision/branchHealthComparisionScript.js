const vscode = acquireVsCodeApi();

let listOfBranch = [];

window.addEventListener("message", (event) => {
  // console.log("Data type", event);
  switch (event.data.command) {
    case "branchNames":
      listOfBranch = event.data.data;
      console.log(listOfBranch);
      initBranchList();
      break;
    case "api-status-message":
      let statMessage = document.getElementById("statMessage");
      statMessage.innerHTML = event.data.data;
      break;
    default:
      console.error("Unrecognized message passed to settings script:");
      console.error(event);
      break;
  }
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function initBranchList() {
  let branch1 = document.getElementById("sourceBranchName");
  let branch2 = document.getElementById("targetBranchName");
  removeAllChildNodes(branch1);
  removeAllChildNodes(branch2);

  listOfBranch.forEach(function (item) {
    //must create separately or bug
    let branchName1 = document.createElement("option");
    branchName1.innerText = item;
    branchName1.setAttribute("value", item);
    branch1.appendChild(branchName1);
    let branchName2 = document.createElement("option");
    branchName2.innerText = item;
    branchName2.setAttribute("value", item);
    branch2.appendChild(branchName2);
  });
}

let button = document.getElementById("compareButton");
button.addEventListener("click", () => {
  submitCredentials();
});

$(document).ready(function () {
  $(".branch1option").select2();
  $(".branch2option").select2();
});

function submitCredentials() {
  //Prepare payload to send to server
  var payload = {};

  //Extract GitHub repo URL from form control into payload object

  let sourceBranchName = document.getElementById("sourceBranchName").value;
  let targetBranchName = document.getElementById("targetBranchName").value;

  //branch1: source, branch2: target
  payload["sourceBranch"] = { sourceBranchName };
  payload["targetBranch"] = { targetBranchName };

  console.log("Create payload and post to vscode",payload);
  //Make API call(s)
  vscode.postMessage({
    command: "updateSettingsChange",
    data: payload,
  });
}
