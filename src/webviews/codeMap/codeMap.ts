import path = require('path');
import * as vscode from 'vscode';
import * as mockCodeMap from '../../api/mockCodeMap';

export function codemapHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri, d3Uri: vscode.Uri): string {

    let width = 1400;
    let height = 750;
    let files = mockCodeMap.mockCodeMapGETRequest(20, ".java");
    let githubURL = vscode.workspace.getConfiguration('Codebase Insights: Git Integration').get("Repository URL");
    console.log(githubURL);
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
            <p>Look at all these files: ${files}</p>
            <h1> Github URL: ${githubURL} </p>
        </body>
        <script src="${scriptUri}"></script>
    </HTML>
    `;
}