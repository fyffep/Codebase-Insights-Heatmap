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
        console.log(
          "Coauthorship network received from server. Displaying it."
        );
        coauthorshipNetworkWebviewPanel.webview.postMessage(responseData);
      } else {
        //Show error
        vscode.window.showInformationMessage(
          "There was a problem retrieving the coauthorship network"
        );
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
                <svg id="graph" width="1200" height="900">
                    <g class="links"/>
                    <g class="nodes"/>
                </svg>
            </div>
            <div id="controlPanel" class="sidePanel">
              <a class="closeButton" onclick="closeNav()">&times;</a>
              <a id="filterButton"></a>
              <br/>
              <a id="clearAllFilters" onclick="clearAllFilters()"></a>
              <h2 id="email"></h2>
              <ul id="filesList"></h2>
            </div>
        </body>
        <script src="${coauthorshipNetworkScriptUri}"/>
    </HTML>
    `;
}
