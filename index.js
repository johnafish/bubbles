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
  context.beginPath();
  context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);

  var c = Math.floor(Math.random() * 200) + 55;
  console.log(c);
  context.fillStyle = `rgb(${c},${c},${c})`
  context.strokeStyle = `rgb(${c},${c},${c})`
  context.fill();
  context.stroke();
}

function collision(circles, cand) {
  for (var i = 0; i < circles.length; i++) {
    maxDist = circles[i].r + cand.r;
    dist = ((circles[i].x - cand.x) ** 2 + (circles[i].y - cand.y) ** 2) ** 0.5;
    if (dist < maxDist) {
      return true;
    }
  }
  return false;
}

// Let a circle with a radius r at horizontal position x fall until it collides
// with any other circle in array
function fallCircle(circles, x, r) {
  var circle;
  var foundCandidate = false;
  for (var i = r; i < c.height - r; i+=0.1) {
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

// Iterate over adjacent circles until they can no longer fall
function placeCircle(circles, x, r) {
  var center = fallCircle(circles, x, r)
  if (center == null) {
    return null;
  }
  while (1) {
    var left = fallCircle(circles, Math.max(r, center.x - 1), r);
    var right = fallCircle(circles, Math.min(center.x + 1, c.width - r), r);
    console.log(left, center, right);

    if (left == null || right == null) {
      return center;
    }

    if (left.y > center.y) {
      center = left;
    }
    else if (right.y > center.y) {
      center = right;
    }
    else {
      return center;
    }
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
