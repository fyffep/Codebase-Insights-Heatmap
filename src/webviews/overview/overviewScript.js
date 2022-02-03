// Handle the message inside the webview
window.addEventListener('message', event => {

    const message = event.data; // The JSON data our extension sent

    //Add list of commit messages (TEMPORARY)
    /*document.getElementById("p1").innerHTML = "Response Received:";
    let p1 = document.getElementById("p1");
    message.activeCommits.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item.fullMessage;
        p1.appendChild(li);
    });*/

    
    //Display dashboard
    let p1 = document.getElementById("p1");
    p1.innerHTML = "";
    var i = 0;
    message.HEAT_METRIC_OPTIONS.forEach((metric) => {
        let li = document.createElement("li");
        li.style.fontSize = 36;
        li.style.color = "white";
        li.innerText = "Average Heat for "+ metric +" is "+ message.averageHeatScoreList[i];
        p1.appendChild(li);
        i++;
    });
});