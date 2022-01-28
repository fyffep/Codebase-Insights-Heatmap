import path = require('path');
import * as vscode from 'vscode';

export function codemapHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri): string {

    let width = 1400;
    let height = 750;
    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
            <script src="https://d3js.org/d3.v7.min.js"></script>
        </head>
        <body>
            <p> This text should be green </p>
        </body>
        <script src="${scriptUri}"></script>
    </HTML>
    `;
}