var c = document.getElementById("bubblecanvas");
var ctx = c.getContext("2d");
const WHITE = "rgb(255,255,255)";
const BLACK = "rgb(0,0,0)";


ctx.fillStyle = WHITE;
ctx.fillRect(0, 0, c.width, c.height);

ctx.strokeStyle = BLACK;
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
