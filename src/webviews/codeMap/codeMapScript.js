//This file exists to modify the script that goes in codeMap.ts with syntax highlighting
//First ensure that you're working with the most recent version of the script by copying it from codeMap.ts and pasting it here
//Then make your changes and copy them back to codeMap.ts
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