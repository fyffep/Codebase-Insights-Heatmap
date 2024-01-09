import * as vscode from "vscode";
import { randomInt } from "crypto";
import axios, { AxiosPromise } from "axios";
import {
  getGitUrl,
  getPersonalAccessToken,
  getSettingsPayload,
  getSettingsPayloadForMerge
} from "../config/config";
import * as config from "../config/config";
import { fileComparisionWebviewPanel } from "../webviews/webviewFactory";

let axiosUrl = config.getAxiosUrl();
//Setup
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export function getCodeMapData(): AxiosPromise<any> {
  //Send request
  var settingsPayload = getSettingsPayload();
  console.log("Requesting analysis of " + getGitUrl());
  return instance
    .post("/analyze/group-by-package/", settingsPayload)
    .then((response) => {
      //Return data from the axios promise
      return response.data;
    })
    .catch((err) => {
      //Handle timeout or error
      console.error(err);
      return err;
    });
}

export function postCredentials(
  payload: any,
  webviewPanel: vscode.WebviewPanel | undefined
): void {
  payload.githubOAuthToken = payload["personalAccessToken"];

  console.log("Sending credentials update...");
  instance
    .post("/analyze/initiate/", payload)
    .then((response) => {
      //post to the server
      console.log("Finished codebase analysis after credentials update.");
      //Show success message in webview
      if (webviewPanel) {
        webviewPanel.webview.postMessage({
          command: "api-status-message",
          data: "✔ Analysis Complete",
        });
      }
    })
    .catch((errorResponse) => {
      console.log(errorResponse);
      //Show error message in webview
      if (webviewPanel) {
        webviewPanel.webview.postMessage({
          command: "api-status-message",
          data: "Something went wrong with your analysis",
        });
      }
    });
}


export function postMergeCredentials(
  webviewPanel: vscode.WebviewPanel | undefined
): void {
  var settingsPayload = getSettingsPayloadForMerge();
  console.log("Requesting analysis of " + getGitUrl());
  console.log(settingsPayload);
  instance
    .post("/mergeAndCompare/", settingsPayload)
    .then((response) => {
      //post to the server
      console.log("Finished codebase analysis after credentials update.");
      //Show success message in webview
      if (webviewPanel) {
        if(response.data == ''){
          webviewPanel.webview.postMessage({
            command: "api-status-message",
            data: "Returning Null Error",
          });
        }else{
          webviewPanel.webview.postMessage({
            command: "api-status-message",
            data: "✔ Merge Analysis Complete",
          });
        }
      }
    })
    .catch((errorResponse) => {
      console.log(errorResponse);
      //Show error message in webview
      if (webviewPanel) {
        webviewPanel.webview.postMessage({
          command: "api-status-message",
          data: "Merge Conflict",
        });
      }
    });
}


export function postModifiedHeatValues(
  payload: any,
  webviewPanel: vscode.WebviewPanel | undefined
): void {
  console.log("Sending heatvalues update...");
  console.log(payload);
  instance
    .post("/weights/adjust/", payload)
    .then((response) => {
      //post to the server
      console.log("Finished codebase analysis after credentials update.");
    })
    .catch((errorResponse) => {
      console.log(errorResponse);
    });
}

export function getCoauthorshipNetwork(): AxiosPromise<any> {
  //Send request
  var settingsPayload = getSettingsPayload();
  console.log("Requesting coauthorship network for " + getGitUrl());
  return instance
    .post("/knowledge/graph/", settingsPayload)
    .then((response) => {
      //Return data from the axios promise
      return response.data;
    })
    .catch((err) => {
      //Handle timeout or error
      console.error(err);
      return null;
    });
}


export function getAllBranchNames(): AxiosPromise<any> {
  //Send request
  var settingsPayload = getSettingsPayload();
  console.log("Requesting branch Names of " + getGitUrl());
  return instance
    .post("/branches/", settingsPayload)
    .then((response) => {
      //Return data from the axios promise
      return response.data;
    })
    .catch((err) => {
      //Handle timeout or error
      console.error(err);
      return err;
    });
}

export function getMergeMapData(): AxiosPromise<any> {
  //Send request
  var settingsPayload = getSettingsPayloadForMerge();
  console.log("Requesting analysis of " + getGitUrl() +"on two branch: "+ settingsPayload["twoBranches"]["parentBranch"]+" and "+ settingsPayload["twoBranches"]["childBranch"]);
  return instance
    .post("/mergeAndCompare/", settingsPayload)
    .then((response) => {
      //Return data from the axios promise
      return response.data;
    })
    .catch((err) => {
      //Handle timeout or error
      console.error(err);
      return err;
    });
}


export function getFileData(filePath: string): AxiosPromise<any> {

  //Send request
  var settingsPayload = config.getSettingsPayloadForFile(filePath);
  console.log("Getting file health over repo for: " + filePath);
  console.log(settingsPayload);
  return instance
    .post("/fileHealthAcrossBranch/fileHealth/", settingsPayload)
    .then((response) => {
      //Return data from the axios promise
      if(fileComparisionWebviewPanel){
        fileComparisionWebviewPanel.webview.postMessage({
          command: "fileNameReceived",
          data: response.data,
        });
      }
      return response.data;
    })
    .catch((err) => {
      //Handle timeout or error
      console.error(err);
      return err;
    });

}