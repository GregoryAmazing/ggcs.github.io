'use strict'

var screenW, screenH;

screenW = window.innerWidth;
screenH = window.innerHeight;

var curText = 'hay guys leafy here!';

var stage = new Konva.Stage({
  container: 'container',
  width: screenW,
  height: screenH
});

var layer = new Konva.Layer();
stage.add(layer);

var shape = new Konva.Text({
  x: 400,
  y: 100,
  fill: 'red',
  fontSize: 69,
  fontFamily: 'Calibri',
  text: curText,
  draggable: true,
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffset: {x : 5, y : 5},
  shadowOpacity: 0.5
});

shape.cache();
shape.filters([Konva.Filters.HSL]);
layer.add(shape);

function setPathText(node,text)
{
  node.clearCache()
  node.text(text);
  layer.draw();
  node.cache()
  layer.batchDraw();
}

var angularSpeed = 200;

var anim = new Konva.Animation(function(frame) {
  var angleDiff = frame.timeDiff * angularSpeed / 1000;
  shape.rotate(angleDiff);
}, layer);


document.addEventListener('keyup', e=>{
  if(e.keyCode === 32)
  {
    console.log('Started');
    anim.start();
  }
  else if(e.keyCode === 88 && anim.isRunning() === true)
  {
    console.log('Stoped');
    anim.stop();
  }
  
  if(e.keyCode === 73)
  {
    console.log('heeey');
  }

  if (e.keyCode === 13)
  {
    
  }
    
})


var sliders = ['hue', 'saturation', 'luminance'];
sliders.forEach(function (attr) {
  var slider = document.getElementById(attr);
  function update() {
    shape[attr](parseFloat(slider.value));
    layer.batchDraw();
  }
  slider.oninput = update;
  update();
});
