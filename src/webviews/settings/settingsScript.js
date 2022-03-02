const vscode = acquireVsCodeApi();
function updateGitUrl() {
  let newUrl = document.getElementById("newGitUrl").value;
  console.log(newUrl);
  let currentGitRepo = document.getElementById("currentGitRepo");
  currentGitRepo.textContent = "Current git repo: " + newUrl;
  vscode.postMessage({
    command: "updateGitUrl",
    data: newUrl,
  });
}
