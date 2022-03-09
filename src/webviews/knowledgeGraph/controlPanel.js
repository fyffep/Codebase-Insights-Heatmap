const vscode = acquireVsCodeApi(); //allows us to use message passing back to the extension for tweaking parameters

//Stuff for the control panel
function openNav() {
  let controlPanel = document.getElementById("controlPanel");
  console.log(controlPanel.style.width);
  if (controlPanel.style.width === "0px" || !controlPanel.style.width) {
    //it's undefined the first time you hit the button, which is a case where we want to set it to 250px
    controlPanel.style.width = "250px";
  } else {
    controlPanel.style.width = "0px";
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
