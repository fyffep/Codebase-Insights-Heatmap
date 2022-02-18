import * as vscode from 'vscode';
import * as mockKnowledgeGraph from '../../api/mockKnowledgeGraph';

export function knowledgeGraphHTML(cssUri:vscode.Uri, scriptUri: vscode.Uri, d3Uri: vscode.Uri) {
    let mockData = mockKnowledgeGraph.mockKnowledgeGraphGETRequest(46);
    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
            <script src="${d3Uri}"></script>
        </head>
        <body>
            <div class="page">
                <h1> Welcome to the knowledge graph! </h1>
            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}