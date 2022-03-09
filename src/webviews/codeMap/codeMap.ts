import path = require("path");
import * as vscode from "vscode";
import * as mockCodeMap from "../../api/mockCodeMap";
import { codeMapWebviewPanel } from "../webviewFactory";
import * as api from "../../api/api";
import * as config from "../../config/config";

export function codemapHTML(args: Map<string, vscode.Uri>): string {
  const d3Uri = args.get("d3");
  const cssUri = args.get("css");
  const codeMapScriptUri = args.get("codeMapScript");
  const controlPanelScript = args.get("controlPanel");

  let width = 1400;
  let height = 750;
  let files = mockCodeMap.mockCodeMapGETRequest(1, ".java");
  let gitUrl = config.getGitUrl();
  console.log(gitUrl);

  //Request entire codebase data
  api.getCodeMapData().then((responseData) => {
    //Send a message to our webview with Codebase data.
    if (codeMapWebviewPanel) {
      codeMapWebviewPanel.webview.postMessage(responseData);
    } else {
      console.error("codeMapWebviewPanel was undefined");
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
            <h1> Codebase Heatmap </h1>
            <p><i> Red-hot files are the most active </i></p>
            <!--p> This text should be green </p-->
            <svg width="600" height="600"></svg>
            <div class="radarChart"></div>
            <!--h1> Github URL: ${gitUrl} </p-->
            <div id="controlPanel" class="sidepanel">
              <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
              <button class="controlbtn" onclick="buttonExample()">I'm a button!</button>
            </div>
            <button class="openbtn" onclick="openNav()">&#9776; Toggle Control Panel</button>
        </body>
        <script src="${controlPanelScript}"></script>
        <script src="${codeMapScriptUri}"></script>
    </HTML>
    `;
}