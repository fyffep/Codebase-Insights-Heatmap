import * as vscode from "vscode";

export function displayFile(args: Map<string, vscode.Uri>): string {
  const cssUri = args.get("css");
  const scriptUri = args.get("script");
  const resultImage = args.get("resultImage");
  console.log(scriptUri);
  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1>Merge Suggestion</h1>
                <img id="imageView" src="${resultImage}">


            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
