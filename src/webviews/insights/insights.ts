import * as vscode from 'vscode';

export function insightsHTML(cssUri:vscode.Uri, scriptUri: vscode.Uri): string {
    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1> Welcome to the insights page! </h1>
            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
