import path = require('path');
import * as vscode from 'vscode';

export function codemapHTML(cssUri: vscode.Uri): string {

    let width = 1400;
    let height = 750;
    return `
    <!DOCTYPE HTML>
    <HTML>
        <head>
            <meta charset="UTF-8" lang="en"/>
            <link rel="stylesheet" type="text/css" href="${cssUri}"/>
        </head>
        <body>
            <div class="page">
                <h1> Welcome to the code map page! </h1>
            </div>
            <canvas id="codeMap" width="${width}" height="${height}"/>
            <script>
                let canvas = document.getElementById("codeMap");
                let ctx = canvas.getContext("2d");
                ctx.moveTo(0,0);
                ctx.lineTo(200, 100);
                ctx.stroke();
            </script>
        </body>
        <script src="codeMapScript.ts"/>
    </HTML>
    `;
}