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
  const radarChartScript = args.get("radarChart");

  let width = 1400;
  let height = 750;
  let files = mockCodeMap.mockCodeMapGETRequest(1, ".java");
  let gitUrl = config.getGitUrl();
  console.log(gitUrl);

  codeMapWebviewPanel?.webview.postMessage({command:"gitHubUrl", data:gitUrl});
  //Request entire codebase data
  api.getCodeMapData().then((responseData) => {
    //Send a message to our webview with Codebase data.
    if (codeMapWebviewPanel) {
      codeMapWebviewPanel.webview.postMessage({command:"mapData", data:responseData});
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
              <div class="autocomplete" style="width:300px;">
                <input id="searchBox" class="searchBox" type="text" value="" name="searchBox" placeholder="Input a file path..."/>
              </div>
            <svg width="800" height="1000"></svg>
            <div id="controlPanel" class="sidepanel">
              <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
              <div class="radarChart"></div>
              <div id="fileDetailsBlock">
                <h3 id="fileName"/>
                <h4 id="filePathHeader">File Path</h4><p id="filePath"/>
                <h4 id="fileAuthorsHeader">File Authors</h4><p id="fileAuthors"/>
              </div>
              <button class="controlbtn" >Send Feedback</button>
            </div>
        </body>
        <script src="${controlPanelScript}"></script>
        <script src="${radarChartScript}"></script>
        <script src="${codeMapScriptUri}"></script>
    </HTML>
    `;
}