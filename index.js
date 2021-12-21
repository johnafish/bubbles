// Colors
const BLACK = "rgb(0,0,0)";
const WHITE = "rgb(255,255,255)";

// Canvas setup
var c = document.getElementById("bubblecanvas");
var ctx = c.getContext("2d");

ctx.fillStyle = WHITE;
ctx.fillRect(0, 0, c.width, c.height);

// draws circle radius r about x,y on context
function drawCircle(context, circle) {
  context.strokeStyle = BLACK;
  context.beginPath();
  context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
  context.stroke();
}

function collision(circles, cand) {
  for (var i = 0; i < circles.length; i++) {
    maxDist = circles[i].r + cand.r;
    dist = Math.sqrt((circles[i].x - cand.x) ** 2 + (circles[i].y - cand.y) ** 2);
    if (dist < maxDist) {
      return true;
    }
  }
  return false;
}

function placeCircle(circles, x, r) {
  var circle;
  var foundCandidate = false;
  for (var i = r; i < c.height - r; i++) {
    var candidate = {
      x: x,
      y: i,
      r: r
    }
    if (!collision(circles, candidate)) {
      foundCandidate = true;
      circle = candidate;
    }
    else {
      break;
    }
  }
  if (foundCandidate) {
    return circle;
  }
  else {
    return null;
  }
}

// Main loop
var stopped = false;
var circles = [];

while (1) {
  var radius = Math.exp(-4 * Math.random()) * c.width / 2;
  var x = Math.random() * (c.width - 2 * radius) + radius; // fix to prevent overlap later
  var circle = placeCircle(circles, x, radius);
  if (circle == null) {
    break;
  }
  drawCircle(ctx, circle);
  circles.push(circle);
}
