import * as vscode from "vscode";
import * as api from "../../api/api";
import axios, { AxiosPromise } from "axios";
import { overviewWebviewPanel } from "../webviewFactory";
import { mockOverview } from "./mockOverview";

export function overviewHTML(args: Map<string, vscode.Uri>): string {
  const cssUri = args.get("css");
  const scriptUri = args.get("script");

  let developers: number = api.getNumberOfDevelopers();
  let sloc: number = api.getSLOC();
  let inactiveDevs: number = api.getNumberOfInactiveDevelopers();
  let commits: number = api.getNumberOfTotalCommits();
  let healthScore: string = api.getOverallCodebaseHealthScore();

  //Request entire codebase data
  api.getDashboardData().then((responseData) => {
    console.log(responseData);
    //Send a message to our webview with Codebase data.
    if (overviewWebviewPanel) {
      overviewWebviewPanel.webview.postMessage(responseData);
    } else {
      console.error("overviewWebviewPanel was undefined");
    }
  });

  //Use mock dashboard data
  /*if (overviewWebviewPanel != undefined)
    {
        overviewWebviewPanel.webview.postMessage(mockOverview);
    }
    else
    {
        console.error("overviewWebviewPanel was undefined");
    }*/

  return `
    <!DOCTYPE HTML>
        <HTML>
            <head>
                <meta charset="UTF-8" lang="en"/>
                <link rel="stylesheet" type="text/css" href="${cssUri}"/>
            </head>
            <body>
                <div class="page">
                    <h1> Overview </h1>
                    <!--h2> ${inactiveDevs} inactive developers out of ${developers} total developers</h2>
                    <h2> ${sloc} lines of code across ${commits} commits </h2>
                    <h2> Overall health score: ${healthScore} </h2>
                    <br/-->
                    
                    <p id="p1">Please wait while we analyze your codebase...</p1>
                </div>
            </body>

            <script src="${scriptUri}"></script>
        </HTML>
    `;
}
