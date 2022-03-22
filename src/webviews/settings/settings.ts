import * as vscode from "vscode";
import * as config from "../../config/config";

export function settingsHTML(args: Map<string, vscode.Uri>): string {
  const cssUri = args.get("css");
  const scriptUri = args.get("script");
  let currentGitRepo = config.getGitUrl();
  let currentBranchName = "";

  //TODO Check if the OAuth Details are already set
  var hasAccessToken = false;

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
                <label for="inputGitUrl">GitHub Repository URL: </label>
                <input type="text" id="inputGitUrl" name="inputGitUrl" placeholder="URL" value="${currentGitRepo}">
                <label for="inputGitUrl">Branch Name: </label>
                <input type="text" id="inputBranchName" name="inputGitUrl" placeholder="Optional" value="${currentBranchName}">
                <br></br>
              
                <!--OAuth-->
                <div id="groupGitHubAuth">
                    ${hasAccessToken ? 
                        //If authenticated, display OK msg
                        '<h3>Authenticated with GitHub ✅</h3>' : 
                        //Else, show auth buttons
                        '<button onClick="openGitHubAuthWindow()">Log In with GitHub</button> \
                        <button onClick="copyGitHubAuthCode()">Click here to copy your authorization code</button>'
                    }
                </div>



                <br></br>
                <br></br>
                <h2>Which Continuous Integration Tool Do You Use?</h2>
                <div class="row">
                    <img id="imgChooseGitHubActions" 
                        src="https://avatars.githubusercontent.com/u/44036562?s=280&v=4"
                        class="four columns"
                    />
                    <img id="imgChooseJenkins" 
                        src="https://www.jenkins.io/images/logos/jenkins/jenkins.svg"
                        class="four columns"
                    />
                    <img id="imgChooseNoCI" 
                        src="https://pbs.twimg.com/profile_images/1099002964184846338/tp1XAwyF_400x400.png"
                        class="four columns"
                    />
                </div>
                <br></br>
                

                <div class="row" id="groupGitHubActions">
                    <h2>GitHub Actions</h2>
                    <p>All set - no further information is needed for GitHub Actions.</p>
                </div>
                <div class="row" id="groupJenkins">
                    <h2>Jenkins</h2>
                    <br></br>
                    <p>We'll need your job URL and API key. We use this to identify which files caused build failures.</p>
                    <br></br>
                    <label for="inputCI">Jenkins URL</label>
                    <input type="text" id="inputCI_URL_Jenkins" name="inputCI" placeholder="Format: https://<host url>/job/<job name>/">
                    <br></br>
                    <label for="inputCI">Jenkins Username</label>
                    <input type="text" id="inputCI_Username_Jenkins" name="inputCI" placeholder="Username">
                    <br></br>
                    <label for="inputCI">API Key</label>
                    <input type="text" id="inputApiKey_Jenkins" name="inputCI" placeholder="Ex: 618edd6a084b245d5a1c5d143a338c2bda">
                    <br></br>
                </div>
                <div class="row" id="groupNoCI">
                    <h2>No CI tool in use.</h2>
                </div>
                <br></br>

                <p>
                    <input onclick="submitCredentials()" class="inputSubmit" type="submit" value="Update Account">
                </p>
            </div>
        </body>
        <script src="${scriptUri}"/>
    </HTML>
    `;
}
