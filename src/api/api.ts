import { randomInt } from "crypto";
import axios, { AxiosPromise } from 'axios';

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

//Actual REST call from Pete's Heroku project
export function helloWorldGetRequest(): AxiosPromise<any> 
{
    //Setup (TODO should be moved so that it is only done once)
    const instance = axios.create({
        baseURL: 'https://supercontinent-lutil.herokuapp.com/api',
        timeout: 15000,
        //headers: {'X-Custom-Header': 'foobar'}
    });

    //Send a request
    var userId = '612854ee6aa27d439ed826e2';
    return instance.get(`/account/all`)
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

/**
 * A TEMPORARY call to analyze an entire codebase until we split up
 * the data retrieval more effectively on backend.
 * @returns the entire Codebase data
 */
export function getEntireCodebase(): AxiosPromise<any> 
{
    //Setup (TODO should be moved so that it is only done once)
    const instance = axios.create({
        baseURL: 'http://localhost:8080/api',
    });

    //Send request
    var githubUrlOfUser = "https://github.com/fyffep/P565-SP21-Patient-Manager"; //TODO get this from preferences
    var urlPayload = {  
        githubUrl: githubUrlOfUser
    };
    console.log("Requesting analysis of " + githubUrlOfUser);
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