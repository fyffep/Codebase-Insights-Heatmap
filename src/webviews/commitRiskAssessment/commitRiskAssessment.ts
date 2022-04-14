import * as vscode from "vscode";
import * as git from "../../utils/git";

export function commitRiskAssessmentHTML(
  args: Map<string, vscode.Uri>
): string {
  const cssUri = args.get("css");
  const scriptUri = args.get("script");
  const stagedFiles = git.getStagedFiles();
  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1>Commit Risk Assessment</h1>
                <h2>Files staged for commit: </h2>
                <ul id="filesList">
                </ul>
                <input onclick="submitStagedFiles()" id="btnSubmitStagedFiles" class="inputSubmit" type="submit" value="Run Analysis">
                <h4 id="requestInfo"></h4>
            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
