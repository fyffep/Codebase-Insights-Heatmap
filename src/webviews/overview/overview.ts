import * as vscode from 'vscode';
import * as api from '../../api';

export function overviewHTML(cssUri:vscode.Uri): string {

    let developers: number = api.getNumberOfDevelopers();
    let sloc: number = api.getSLOC();
    let inactiveDevs: number = api.getNumberOfInactiveDevelopers();
    let commits: number = api.getNumberOfTotalCommits();
    let healthScore: string = api.getOverallCodebaseHealthScore();

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
            </div>
        </body>
    </HTML>
    `;
}