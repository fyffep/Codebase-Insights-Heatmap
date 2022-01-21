import * as vscode from 'vscode';

export function insightsHTML(cssUri:vscode.Uri): string {
    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <h1> Welcome to the insights page! </h1>
        </body>
    </HTML>
    `;
}
