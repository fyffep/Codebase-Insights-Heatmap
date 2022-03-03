const vscode = acquireVsCodeApi(); //allows us to use message passing back to the extension for tweaking parameters

//Stuff for the control panel
function openNav() {
  document.getElementById("controlPanel").style.width = "250px";
}
function closeNav() {
  document.getElementById("controlPanel").style.width = "0";
}
function buttonExample() {
  vscode.postMessage({
    data: "Thanks for pressing that button!",
  });
}
