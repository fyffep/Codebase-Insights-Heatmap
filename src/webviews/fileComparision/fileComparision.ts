import * as vscode from "vscode";
import * as api from "../../api/api";
import { fileComparisionWebviewPanel } from "../webviewFactory";

export function displayFile(args: Map<string, vscode.Uri>): string {
  const cssUri = args.get("css");
  const scriptUri = args.get("script");

  api.getCodeMapData().then((responseData) => {
    //Send a message to our webview with Codebase data.
    if (fileComparisionWebviewPanel) {
        console.log("request for codemap data");
        fileComparisionWebviewPanel.webview.postMessage({
        command: "mapData",
        data: responseData,
      });
    } else {
      console.error("codeMapWebviewPanel was undefined");
    }
  });

  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link rel="stylesheet" href="${cssUri}" />
        </head>
        <body>
            <h1>Click on file to display file heat from all branches </h1>
            <div id="fileHealthAnalysis" class="fileHealthAnalysis-popup">
                <div class="fileInfo" id="fileInfo">
                <span
                    onclick="closePopup()"
                    class="close"
                    >&times;</span
                >
                <h2 id="fileNameInfo">File Path: </h2>
                </div>
                <div id="tableContainer" class="tableContainer">
                <input
                    type="text"
                    id="branchSearch"
                    class="branchSearch"
                    onkeyup="searchForBranch()"
                    placeholder="Search for names.."
                />
                <table width="100%" id="branchTable" class="scrollTable">
                    <thead>
                    <tr>
                        <th width="50%"><h3>Branch Name</h3></th>
                        <th width="50%"><h3>File Health</h3></th>
                    </tr>
                    </thead>
                    <tbody class="content"></tbody>
                </table>
                </div>
            </div>
        
            <div id="hierarchy">
            </div>
        </body>
        <script src="${scriptUri}"></script>
    </HTML>  
    `;
}
