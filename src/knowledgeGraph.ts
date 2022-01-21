import * as vscode from 'vscode';

export function knowledgeGraphHTML(cssUri:vscode.Uri) {
    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <h1> Welcome to the knowledge graph! </h1>
        </body>
    </HTML>
    `;
}