import { randomInt } from "crypto";
import axios, { AxiosPromise } from 'axios';
import { getGitUrl, getJenkinsSettings } from "../config/config";

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


/**
 * A TEMPORARY call to analyze an entire codebase until we split up
 * the data retrieval more effectively on backend.
 * @returns the entire Codebase data
 */
export function getEntireCodebase(): AxiosPromise<any> 
{
    //Send request
    var githubUrlOfUser = getGitUrl();  //example: "https://github.com/fyffep/P565-SP21-Patient-Manager". User must set this in preferences
    var urlPayload = {  
        githubUrl: githubUrlOfUser
    };
    console.log("Requesting analysis of " + githubUrlOfUser);
    let jenkinsData = getJenkinsSettings();
    instance.post('/jenkins-simple/',jenkinsData); //Send the Jenkins data
    return instance.post('/analyze/codebase/', urlPayload)
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
        githubUrl: githubUrlOfUser
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


export function postCredentials(payload:any): void 
{
    console.log("Sending credentials update...");
    console.log(payload); //TEMP
    instance.post('/analyze/initiate/', payload).then((response) => {
        console.log("Finished codebase analysis after credentials update.");
    });
}