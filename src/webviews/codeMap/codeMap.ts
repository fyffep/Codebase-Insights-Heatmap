import path = require('path');
import * as vscode from 'vscode';

export function codemapHTML(cssUri: vscode.Uri): string {
    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <h1> Welcome to the code map page! </h1>
        </body>
    </HTML>
    `;
}