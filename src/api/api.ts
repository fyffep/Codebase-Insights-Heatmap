import * as vscode from "vscode";
import { randomInt } from "crypto";
import axios, { AxiosPromise } from 'axios';
import { getGitUrl, getBranchName } from "../config/config";

//Setup
const instance = axios.create({
    baseURL: 'https://refactor-radar.herokuapp.com/api'
    //baseURL: 'http://localhost:8080/api'
});

//These are all temporary until we get the REST API up
export function getNumberOfDevelopers(): number {
    return randomInt(25,100);
}

export function getSLOC(): number {
    return randomInt(10000, 1000000);
}

export function getNumberOfInactiveDevelopers(): number {
    return randomInt(20);
}

export function getNumberOfTotalCommits(): number {
    return randomInt(100, 100000);
}

export function getOverallCodebaseHealthScore(): string {
    let score: number = randomInt(100);
    if (score < 60) {
        return 'F';
    }
    else if (score < 70) {
        return 'D';
    }
    else if (score < 80) {
        return 'C';
    }
    else if (score < 90) {
        return 'B';
    }
    else {
        return 'A';
    }
}


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
    payload.githubOAuthToken = "FIXME";

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
