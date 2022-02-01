import path = require('path');
import * as vscode from 'vscode';
import * as mockCodeMap from '../../api/mockCodeMap';
import * as config from '../../config/config';

export function codemapHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri, d3Uri: vscode.Uri): string {

    let width = 1400;
    let height = 750;
    let files = mockCodeMap.mockCodeMapGETRequest(20, ".java");
    let gitUrl = config.getGitUrl();
    console.log(gitUrl);
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
            <h1> Github URL: ${gitUrl} </p>
        </body>
        <script src="${scriptUri}"></script>
    </HTML>
    `;
}