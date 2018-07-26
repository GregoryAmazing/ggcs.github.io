'use strict'

console.log('js running!');

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ch = canvas.height;
var cw = canvas.width;

log(cw)
log(ch)

var ctx = canvas.getContext('2d');

if (typeof(Storage) !== "undefined") {
} else {
    alert("Sorry, your browser does not support web storage... No data will be saved.")
}

function log(msg='test!')
{
    console.log(msg);
}




function txt(msg,x,y,size,color,font,outline,align)
{
    var style = size+"px "+font

    ctx.font = style;
    ctx.fillStyle = color;
    ctx.textAlign= align; 
    ctx.fillText(msg,x,y+size);
    if(outline != false)
    {
    ctx.lineWidth = outline;
    ctx.strokeText(msg,x,y+size);
    }
}



function drawImageRot(img,x,y,width,height,deg, imgStartX, imgStartY=0){

    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img, imgStartX, imgStartY, width, height, width/2*(-1), height/2*(-1), width, height);


    //reset the canvas  
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}




function areColiding(obj1,obj2)
{
    if (obj1.x < obj2.x + obj2.w &&
        obj1.x + obj1.w > obj2.x &&
        obj1.y < obj2.y + obj2.h &&
        obj1.h + obj1.y > obj2.y)
    {
        return true
    }
    else
     return false
}


function playSFX(sound)
{
    if(user.settings.sfx.on)
        sfx[sound].play();
}

function playMusic(track)
{
    if(user.settings.music.on)
        music[track].play();
}

function drawBtn(obj)
{
    ctx.drawImage(assets, obj.xpos, obj.ypos, obj.w, obj.h, obj.x, obj.y, obj.w, obj.h)
}

function saveToLS(key, value)
{
    localStorage[key] = JSON.stringify(value)
}

function getFromLS(key)
{
    return JSON.parse(localStorage[key]);
}


