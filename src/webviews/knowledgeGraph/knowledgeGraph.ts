import * as vscode from "vscode";
import * as mockKnowledgeGraph from "../../api/mockKnowledgeGraph";
import { knowledgeGraphWebviewPanel } from "../webviewFactory";

export function knowledgeGraphHTML(
  cssUri: vscode.Uri,
  scriptUri: vscode.Uri,
  d3Uri: vscode.Uri
) {
  mockKnowledgeGraph.mockKnowledgeGraphGETRequest(46).then((responseData) => {
    console.log(responseData);
    if (knowledgeGraphWebviewPanel) {
      knowledgeGraphWebviewPanel.webview.postMessage(responseData);
    } else {
      console.error(
        "knowledgeGraphWebviewPanel was undefined when we tried to post the message to it"
      );
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
            <div class="page">
                <h1> Welcome to the knowledge graph! </h1>
                <svg id="graph" width="1000" height="750">
                    <g class="links"/>
                    <g class="nodes"/>
                </svg>
            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
