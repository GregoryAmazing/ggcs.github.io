var angle = 0;
var S = 0.67;
var L = 10;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(30);
  angle = map(mouseX, 0, width, 0, TWO_PI);
  stroke(30);
  textSize(32);
  text('Angle:' + Math.round(angle * 100) / 100, 10, 30);
  fill(100, 0, 153);
  textSize(20);
  text('Move your mouse from left to right', 10, 55);
  fill(92, 0, 145);
  stroke(255);
  translate(width / 2, height - 50);
  branch(200);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > L) {
    push();
    rotate(angle);
    branch(len * S);
    pop();
    push();
    rotate(-angle);
    branch(len * S);
    pop();
  } else circle(0, 0, len);

  //line(0, 0, 0, -len * 0.67);
}
