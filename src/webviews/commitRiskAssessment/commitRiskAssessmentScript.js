var stagedFiles;
window.addEventListener("message", (event) => {
    if (event.data.command === "stagedFiles") {
        stagedFiles = event.data.data;
        let i;
        let filesList = document.getElementById("filesList");
        let innerHTML = "";
        for (i=0; i < stagedFiles.length; i++)
        {
            innerHTML += "<li>" + stagedFiles[i] + "</li>";
        }
        filesList.innerHTML = innerHTML;
    }
    else if (event.data.command === "submitRequest") {
        //Submit staged files to backend
    }
});

function submitStagedFiles() {
    displayRequestSentMessage();
    //TODO, waiting on endpoint from backend
}

function displayRequestSentMessage() {
    let requestInfo = document.getElementById("requestInfo");
    requestInfo.innerHTML = "Waiting on analysis results...";
}