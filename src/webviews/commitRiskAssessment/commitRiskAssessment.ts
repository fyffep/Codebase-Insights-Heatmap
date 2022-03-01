import * as vscode from "vscode";

export function commitRiskAssessmentHTML(
  args: Map<string, vscode.Uri>
): string {
  const cssUri = args.get("css");
  const scriptUri = args.get("script");
  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1> Welcome to the commitRiskAssessment page! </h1>
            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
