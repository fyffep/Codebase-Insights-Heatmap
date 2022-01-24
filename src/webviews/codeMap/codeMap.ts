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
                function drawCircle(context, x, y, radius) {
                    context.beginPath();
                    context.arc(x, y, radius, 0, 2 * Math.PI);
                    context.fill();
                    context.stroke();
                }
                let canvas = document.getElementById("codeMap");
                let width = canvas.width;
                let height = canvas.height;
                let ctx = canvas.getContext("2d");
                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'red';
                drawCircle(ctx, width/2, height/2, 15);
            </script>
        </body>
        <script src="codeMapScript.ts"/>
    </HTML>
    `;
}