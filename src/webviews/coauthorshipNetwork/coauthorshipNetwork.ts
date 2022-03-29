import * as vscode from "vscode";
import { coauthorshipNetworkWebviewPanel } from "../webviewFactory";
import * as api from "../../api/api";

export function coauthorshipNetworkHTML(args: Map<string, vscode.Uri>) {
  const cssUri = args.get("css");
  const d3Uri = args.get("d3");
  const coauthorshipNetworkScriptUri = args.get("coauthorshipNetworkScript");

  //Request Knowledge Graph
  api.getCoauthorshipNetwork().then((responseData) => {
    //Send a message to our webview with Codebase data.
    if (coauthorshipNetworkWebviewPanel) {
      if (responseData) {
        console.log("Knowledge Graph received from server. Displaying it.");
        coauthorshipNetworkWebviewPanel.webview.postMessage(responseData);
      }
      else {
        //Show error
        vscode.window.showInformationMessage("There was a problem retrieving the Knowledge Graph.");
      }
    } else {
      console.error(
        "coauthorshipNetworkWebviewPanel was undefined when we tried to post the message to it"
      );
    }
  });  

  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
            <script src="${d3Uri}"></script>
        </head>
        <body>
            <div class="page">
                <h1> Knowledge Graph </h1>
                <svg id="graph" width="600" height="600">
                    <g class="links"/>
                    <g class="nodes"/>
                </svg>
            </div>
            <div id="controlPanel" class="sidepanel">
              <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
              <button class="controlbtn" onclick="buttonExample()">I'm a button!</button>
            </div>
            <button class="openbtn" onclick="openNav()">&#9776; Toggle Control Panel</button>
        </body>
        <script src="${coauthorshipNetworkScriptUri}"/>
    </HTML>
    `;
}
