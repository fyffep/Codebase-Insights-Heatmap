import * as vscode from 'vscode';
import * as api from './api';

export function overviewHTML(cssUri:vscode.Uri): string {

    let numberOfDevelopers: number = api.getNumberOfDevelopers();

    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <h1> Welcome to the overview page! </h1>
        </body>
    </HTML>
    `;
}