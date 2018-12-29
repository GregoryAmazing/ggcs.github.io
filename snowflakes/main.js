// Coding Challenge 128: SketchRNN Snowflakes
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/128-sketchrnn-snowflakes.html
// https://youtu.be/pdaNttb7Mr8

let model;
let strokePath = null;

let x, y;
let pen = "down";
let snowflakeCounter = 0;
let maxSnowflakes = 200     ;
let colors = ["#F2E2D2","#BCC1BA","#9FB7B9","#84C0C6","#46B1C9"];

function updateCounter() {
    document.getElementById("counter").innerText = "Snowflakes in total: "+snowflakeCounter
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetCanvas()
  model = ml5.SketchRNN("snowflake", modelReady);
}

function resetCanvas() {
  snowflakeCounter = 0
  x = random(-width / 2, width / 2);
  y = random(-height / 2, height / 2);
  background(0);
}

function modelReady() {
  console.log("model ready");
  model.reset();
  model.generate(gotSketch);
}

let color = colors[Math.floor((Math.random()*colors.length))]

function draw() {
  translate(width / 2, height / 2);
  if (strokePath != null) {
    let newX = x + strokePath.dx * 0.2;
    let newY = y + strokePath.dy * 0.2;
    if (pen == "down") {
      stroke(color);
      strokeWeight(3);
      line(x, y, newX, newY);
    }
    pen = strokePath.pen;
    strokePath = null;
    x = newX;
    y = newY;

    if (pen !== "end") {
      model.generate(gotSketch);
    } else {
      console.log("drawing complete");
      snowflakeCounter+=1
      updateCounter()   
      if(snowflakeCounter >= maxSnowflakes){
        resetCanvas()
      }
      model.reset();
      color = colors[Math.floor((Math.random()*colors.length))]
      model.generate(gotSketch);
      x = random(-width / 2, width / 2);
      y = random(-height / 2, height / 2);
    }
  }
}

function gotSketch(error, s) {
  if (error) {
    console.error(error);
  } else {
    strokePath = s;
    //console.log(strokePath);
  }
}
