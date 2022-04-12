import * as vscode from "vscode";
import { randomInt } from "crypto";
import axios, { AxiosPromise } from 'axios';
import { getGitUrl, getBranchName } from "../config/config";
import * as config from "../config/config";

let axiosUrl = config.getAxiosUrl();
//Setup
const instance = axios.create({
    baseURL: axiosUrl,
    //baseURL: 'http://localhost:8080/api'
});

export function getDashboardData(): AxiosPromise<any> 
{
    //Send request
    var githubUrlOfUser = getGitUrl();  //example: "https://github.com/fyffep/P565-SP21-Patient-Manager". User must set this in preferences
    var urlPayload = {  
        githubUrl: githubUrlOfUser
    };
    console.log("Requesting analysis of " + githubUrlOfUser);
    return instance.post('/analyze/dashboard/', urlPayload)
        .then((response) => {
            //Return data from the axios promise
            return response.data;
        })
        .catch(err => {
            //Handle timeout or error
            console.error(err);
            return err;
        });
}


export function getCodeMapData(): AxiosPromise<any> 
{
    //Send request
    var githubUrlOfUser = getGitUrl();  //example: "https://github.com/fyffep/P565-SP21-Patient-Manager". User must set this in preferences
    var urlPayload = {  
        githubUrl: githubUrlOfUser,
        branchName: getBranchName()
    };
    console.log("Requesting analysis of " + githubUrlOfUser);
    return instance.post('/analyze/group-by-package/', urlPayload)
        .then((response) => {
            //Return data from the axios promise
            return response.data;
        })
        .catch(err => {
            //Handle timeout or error
            console.error(err);
            return err;
        });
}


export function postCredentials(payload:any, webviewPanel: vscode.WebviewPanel | undefined): void 
{
    //TEMP: this should be made a request header instead & should be retrieved from local storage
    payload.githubOAuthToken = payload["personalAccessToken"];

    console.log("Sending credentials update...");
    console.log(payload); //TEMP
    instance.post('/analyze/initiate/', payload).then((response) => { //post to the server
        console.log("Finished codebase analysis after credentials update.");
        //Show success message in webview
        if (webviewPanel) {
            webviewPanel.webview.postMessage({
                "command": "api-status-message",
                "data": "✔ Analysis Complete"
            });
        }
    }).catch((errorResponse) => {
        console.log(errorResponse);
        //Show error message in webview
        if (webviewPanel) {
            webviewPanel.webview.postMessage({
                "command": "api-status-message",
                "data": "Something went wrong with your analysis"
            });
        }
    });
}


export function postModifiedHeatValues(payload:any, webviewPanel: vscode.WebviewPanel | undefined): void 
{
    console.log("Sending heatvalues update...");
    instance.post('/weights/adjust/', payload).then((response) => { //post to the server
        console.log("Finished codebase analysis after credentials update.");
    }).catch((errorResponse) => {
        console.log(errorResponse);
    });
}

export function getCoauthorshipNetwork(): AxiosPromise<any> 
{
    //Send request
    var githubUrlOfUser = getGitUrl();  //example: "https://github.com/fyffep/P565-SP21-Patient-Manager". User must set this in preferences
    var urlPayload = {  
        githubUrl: githubUrlOfUser
    };
    console.log("Requesting coauthorship network for " + githubUrlOfUser);
    return instance.post('/knowledge/graph/', urlPayload)
        .then((response) => {
            //Return data from the axios promise
            return response.data;
        })
        .catch(err => {
            //Handle timeout or error
            console.error(err);
            return null;
        });
}
