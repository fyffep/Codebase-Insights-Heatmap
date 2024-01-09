import * as vscode from "vscode";
import * as api from "../../api/api";
import { branchHealthComparisionWebviewPanel } from "../webviewFactory";

export function displayFile(args: Map<string, vscode.Uri>): string {
  const cssUri = args.get("css");
  const scriptUri = args.get("script");
  const resultImage = args.get("resultImage");

  api.getAllBranchNames().then((responseData) => {
    //Send a message to our webview with Codebase data.
    console.log(responseData);
    if (branchHealthComparisionWebviewPanel) {
        branchHealthComparisionWebviewPanel.webview.postMessage({
          command: "branchNames",
          data: responseData,
        });
      } else {
        console.error("branchHealthComparisionWebviewPanel was undefined");
      }
  });


  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
            <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1>Input Branch Names and Compare Branch Health</h1>


                <table class="branchSelection" width="100%">
                	<tr>
                    	<th>
                            <label for="branch1">From Branch:</label><br>
                      		<select id="sourceBranchName" class="branch1option">
                                
                  			</select>
                        </th>
                    </tr>
                    <tr>    	
                        <th>
                        	<label for="branch1">To Branch:</label><br>
                            <select id="targetBranchName" class="branch2option">
                                
                            </select> <br>
                        </th>
                    </tr>

                </table>
                
                


                <table style="width: 100%;">
                    <button id="compareButton"> Analyze Branch Health After Merge </button>
                    <h4 id="statMessage"></h4>
                </table>
                
                <br><br>


            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
