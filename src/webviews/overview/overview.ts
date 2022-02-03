import * as vscode from 'vscode';
import * as api from '../../api/api';
import axios, { AxiosPromise } from 'axios';
import { overviewWebviewPanel } from '../webviewFactory';

export function overviewHTML(cssUri:vscode.Uri, scriptUri: vscode.Uri): string {

    let developers: number = api.getNumberOfDevelopers();
    let sloc: number = api.getSLOC();
    let inactiveDevs: number = api.getNumberOfInactiveDevelopers();
    let commits: number = api.getNumberOfTotalCommits();
    let healthScore: string = api.getOverallCodebaseHealthScore();

    //Request entire codebase data
    api.getEntireCodebase().then(responseData => {
        console.log(responseData);
        //Send a message to our webview with Codebase data.
        if (overviewWebviewPanel != undefined)
        {
            overviewWebviewPanel.webview.postMessage(responseData);
        }
        else
        {
            console.error("overviewWebviewPanel was undefined");
        }
    });

    return `
    <!DOCTYPE HTML>
        <HTML>
            <head>
                <meta charset="UTF-8" lang="en"/>
                <link rel="stylesheet" type="text/css" href="${cssUri}"/>
            </head>
            <body>
                <div class="page">
                    <h1> Welcome to the overview page! </h1>
                    <h2> ${inactiveDevs} inactive developers out of ${developers} total developers</h2>
                    <h2> ${sloc} lines of code across ${commits} commits </h2>
                    <h2> Overall health score: ${healthScore} </h2>
                    <br/>
                    
                    <p id="p1">Awaiting</p1>
                </div>
            </body>

           
            <script>
                // Handle the message inside the webview
                window.addEventListener('message', event => {

                    const message = event.data; // The JSON data our extension sent

                    //Add list of commit messages (TEMPORARY)
                    document.getElementById("p1").innerHTML = "Response Received:";
                    let p1 = document.getElementById("p1");
                    message.activeCommits.forEach((item) => {
                        let li = document.createElement("li");
                        li.innerText = item.fullMessage;
                        p1.appendChild(li);
                    });
                });
            </script>
        </HTML>
    `;
}