const vscode = acquireVsCodeApi();
/*function updateGitUrl() {
  let newUrl = document.getElementById("inputGitUrl").value;
  console.log(newUrl);
  let currentGitRepo = document.getElementById("currentGitRepo");
  currentGitRepo.textContent = "Current git repo: " + newUrl;
  vscode.postMessage({
    command: "updateGitUrl",
    data: newUrl,
  });
}*/

function openGitHubAuthWindow()
{
  //TODO
}

function copyGitHubAuthCode()
{
  vscode.postMessage({
    command: "copyGitUserCode"
  });
}


////// CI Tool Controls to Submit API Key & Other Inputs //////
const groupGitHubActions = document.getElementById("groupGitHubActions");
const groupJenkins = document.getElementById("groupJenkins");
var toolChosen = "NONE";
function hideAllCIGroups() {
  groupGitHubActions.hidden = true;
  groupJenkins.hidden = true;
}
hideAllCIGroups();

//Select GitHub Actions as CI
document.getElementById("imgChooseGitHubActions").addEventListener("click", function (e) {
  hideAllCIGroups();
  groupGitHubActions.hidden = false;
  toolChosen = "GitHub Actions";
});
//Select GitHub Actions as CI
document.getElementById("imgChooseJenkins").addEventListener("click", function (e) {
  hideAllCIGroups();
  groupJenkins.hidden = false;
  toolChosen = "Jenkins";
});
//Select No CI
document.getElementById("imgChooseNoCI").addEventListener("click", function (e) {
  hideAllCIGroups();
  toolChosen = "NONE";
});


//Click submit button to update account
function submitCredentials() 
{
  //Prepare payload to send to server
  var payload = {};

  //Extract GitHub repo URL from form control into payload object
  let gitHubUrl = document.getElementById("inputGitUrl").value;
  payload["gitHubUrl"] = gitHubUrl;

  //Extract CI tool info from form controls into payload object
  payload["toolChosen"] = toolChosen;
  switch (toolChosen)
  {
    case "GitHub Actions":
    {
      const apiKey = document.getElementById("inputApiKey_GitHubActions").value;

      //TODO validate
      
      payload["apiKey"] = apiKey;
      break;
    }
    case "Jenkins":
    {
      const jobUrl = document.getElementById("inputCI_URL_Jenkins").value;
      const apiKey = document.getElementById("inputApiKey_Jenkins").value;

      //TODO validate

      payload["jobUrl"] = jobUrl;
      payload["apiKey"] = apiKey;
      break;
    }
    //Default: No CI. Nothing special is needed.
  }

  //Make API call(s)
  vscode.postMessage({
    command: "submitSettingsChange",
    data: payload
  });
}



/*var groupGitHubAuth = document.getElementById("groupGitHubAuth");
groupGitHubAuth.hidden = true;
//Select YES - Git repo is public
document.getElementById("isPublicYes").addEventListener("click", function (e) {
  //Hide authorization controls
  groupGitHubAuth.hidden = true;
});

//Select NO - Git repo is not public
document.getElementById("isPublicNo").addEventListener("click", function (e) {
  //Show authorization controls
  groupGitHubAuth.hidden = false;
});*/