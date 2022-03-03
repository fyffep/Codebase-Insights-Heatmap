import * as vscode from "vscode";
import * as config from "../../config/config";

export function settingsHTML(args: Map<string, vscode.Uri>): string {
  const cssUri = args.get("css");
  const scriptUri = args.get("script");
  let currentGitRepo = config.getGitUrl();
  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1> Welcome to the settings page! </h1>
                <p id="currentGitRepo"> Current git repo: ${currentGitRepo}</p>
                <label for="newGitUrl">New git URL: </label>
                <input type="text" id="newGitUrl" name="newGitUrl"><br>
                <input onclick="updateGitUrl()" type="submit" value="Set git URL">
                <p id="noteAboutPrivateRepositories">Note: if your repository is private, you will need to run the OAuth commands below. If your repo is public, you may ignore them.</p>
            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
