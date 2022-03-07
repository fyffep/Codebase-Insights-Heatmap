import path = require('path');
import * as vscode from 'vscode';
import * as mockCodeMap from '../../api/mockCodeMap';
import { codeMapWebviewPanel } from "../webviewFactory";
import * as api from "../../api/api";
import * as config from '../../config/config';

export function codemapHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri, radarScriptUri: vscode.Uri, d3Uri: vscode.Uri): string {

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

            <p> This text should be green </p>
            <svg width="500" height="500"></svg>
            <div class="radarChart"></div>
            <h1> Github URL: ${gitUrl} </p>
        </body>
        <script src="${scriptUri}"></script>
    </HTML>
    `;
}