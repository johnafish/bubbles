// Colors
const BLACK = "rgb(0,0,0)";
const WHITE = "rgb(255,255,255)";

// Canvas setup
var c = document.getElementById("bubblecanvas");
var ctx = c.getContext("2d");

ctx.fillStyle = WHITE;
ctx.fillRect(0, 0, c.width, c.height);

// draws circle radius r about x,y on context
function drawCircle(context, x, y, r) {
  context.strokeStyle = BLACK;
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();
}

drawCircle(ctx, 50, 40, 20);
