import * as vscode from 'vscode';
import * as api from '../../api';
import axios, { AxiosPromise } from 'axios';

export function overviewHTML(cssUri:vscode.Uri): string {

    let developers: number = api.getNumberOfDevelopers();
    let sloc: number = api.getSLOC();
    let inactiveDevs: number = api.getNumberOfInactiveDevelopers();
    let commits: number = api.getNumberOfTotalCommits();
    let healthScore: string = api.getOverallCodebaseHealthScore();

    //Hello World GET
    helloWorldGetRequest().then(responseData => {
        console.log(responseData); 
    });

    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1> Welcome to the overview page! </h1>
                <h2> ${inactiveDevs} inactive developers out of ${developers} total developers</h2>
                <h2> ${sloc} lines of code across ${commits} commits </h2>
                <h2> Overall health score: ${healthScore} </h2>

                <button onclick="myFunction2()">This is my broken button</button>
            </div>
        </body>

        <script>
            function myFunction2() {
                console.log("Hello world");
            }

        </script>
    </HTML>
    `;
}

function helloWorldGetRequest(): AxiosPromise<any> 
{
    //Setup (TODO should be moved so that it is only done once)
    const instance = axios.create({
        baseURL: 'https://supercontinent-lutil.herokuapp.com/api',
        timeout: 5000,
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