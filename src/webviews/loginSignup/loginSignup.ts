import * as vscode from "vscode";
import * as config from "../../config/config";

export function settingsHTML(args: Map<string, vscode.Uri>): string {
  const githubActionsLogoUri = args.get("githubActionsLogo");
  const jenkinsLogoUri = args.get("jenkinsLogo");
  const noCILogoUri = args.get("noCILogo");
  const cssUri = args.get("css");
  const scriptUri = args.get("script");
  let currentGitRepo = config.getGitUrl();
  let branchName = config.getBranchName();
  let jenkinsUrl = config.getJobUrl();
  let jenkinsUsername = config.getCiUsername();
  let jenkinsApiKey = config.getApiKey();

  //TODO Check if the OAuth Details are already set
  let gitOAuthToken = config.getApiKey(); //QUICK FIX
  var hasAccessToken = gitOAuthToken && gitOAuthToken !== "";

  return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1> Settings </h1>

                <div class="row">
                    <h2>GitHub Repository</h2>
                    <table>
                        <tr>
                            <td>
                                GitHub Repository URL
                            </td>
                            <td>
                                <input type="text" id="inputGitUrl" name="inputGitUrl" placeholder="URL" value="${currentGitRepo}" class="inputTextField">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Branch Name
                            </td>
                            <td>
                            <input type="text" id="inputBranchName" name="inputGitUrl" placeholder="Optional" value="${branchName}" class="inputTextField">
                            </td>
                        </tr>
                    </table>
                </div>
                
                
                
                
                
                <br></br>
              
                <!--OAuth-->
                <h2>GitHub Sign-in</h2>
                <div id="groupGitHubAuth">
                    ${hasAccessToken ? 
                        //If authenticated, display OK msg
                        '<h3>Authenticated with GitHub ✅</h3>' : 
                        //Else, show auth buttons
                        '<table> \
                            <h4>Step 1. Click the button to copy your authorization code</h4> \
                            <button onClick="copyGitHubAuthCode()" class="innerDivToCenter">Click here to copy the code</button> \
                            <br class="spacer-mini" /> \
                            <h4>Step 2. Paste the authorization code into your browser after clicking the button below to open the GitHub login website</h4> \
                            <button onClick="openGitHubAuthWindow()" class="innerDivToCenter">Log In with GitHub</button> \
                        </table>'
                    }
                </div>



                <br></br>
                <h2>Which Continuous Integration Tool Do You Use?</h2>
                <table maxWidth="100%">
                    <tr>
                        <td class="tdLogo">
                            <img id="imgChooseGitHubActions" class="innerDivToCenter"
                                src="${githubActionsLogoUri}"
                            />
                        </td>
                        <td class="tdLogo">
                            <img id="imgChooseJenkins" class="innerDivToCenter"
                                src="${jenkinsLogoUri}"
                            />
                        </td>
                        <td class="tdLogo">
                            <img id="imgChooseNoCI" class="innerDivToCenter"
                                src="${noCILogoUri}"
                            />
                        </td>
                    </tr>
                </table>
                

                <div class="row" id="groupGitHubActions">
                    <h2>GitHub Actions</h2>
                    <p>All set - no further information is needed for GitHub Actions.</p>
                </div>

                <div class="row" id="groupJenkins">
                    <h2>Jenkins</h2>
                    <p>We'll need your job URL and API key. We use this to identify which files caused build failures.</p>
                    <table>
                        <tr>
                            <td>
                                Jenkins URL
                            </td>
                            <td>
                                <input type="text" id="inputCI_URL_Jenkins" name="inputCI" placeholder="Format: https://<host url>/job/<job name>/" value="${jenkinsUrl}" class="inputTextField">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Jenkins Username
                            </td>
                            <td>
                                <input type="text" id="inputCI_Username_Jenkins" name="inputCI" placeholder="Username" value="${jenkinsUsername}" class="inputTextField">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                API Key
                            </td>
                            <td>
                                <input type="text" id="inputApiKey_Jenkins" name="inputCI" placeholder="Ex: 618edd6a084b245d5a1c5d143a338c2bda" value="${jenkinsApiKey}" class="inputTextField">
                            </td>
                        </tr>
                    </table>
                    <br></br>
                </div>

                <div class="row" id="groupNoCI">
                    <h2>No CI tool in use.</h2>
                </div>
                <br></br>

                <table style="width: 100%;">
                    <input onclick="submitCredentials()" id="btnSubmitCredentials" class="inputSubmit innerDivToCenter" type="submit" value="Update Account">
                    <h4 id="hUpdatingAccount">We're now analyzing your codebase...</h4>
                </table>
            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
