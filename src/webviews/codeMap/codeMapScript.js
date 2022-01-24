//This file exists to modify the script that goes in codeMap.ts with syntax highlighting
//First ensure that you're working with the most recent version of the script by copying it from codeMap.ts and pasting it here
//Then make your changes and copy them back to codeMap.ts
console.log("Hello world!");
let canvas = document.getElementById("codeMap");
let ctx = canvas.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200, 100);
ctx.stroke();