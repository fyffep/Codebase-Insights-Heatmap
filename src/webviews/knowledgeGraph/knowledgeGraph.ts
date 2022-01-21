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
            <div class="page">
                <h1> Welcome to the knowledge graph! </h1>
            </div>
        </body>
    </HTML>
    `;
}