// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c', { preserveObjectStacking: true })
var canvasHtml = document.getElementById('c')
var ctx = canvasHtml.getContext('2d');

fabric.Group.prototype._controlsVisibility = {
    tl: true,
    tr: true,
    br: true,
    bl: true,
    ml: false,
    mt: false,
    mr: false,
    mb: false,
    mtr: true
};
var border = new fabric.Rect({
    left: window.innerWidth / 2,
    top: 0,
    originX: 'center',
    originY: 'top',
    width: window.innerHeight,
    height: window.innerHeight - 8,
    fill: 'rgba(0,0,0,0)',
    strokeDashArray: [10, 5],
    stroke: 'red',
    strokeWidth: 3,
});
//canvas.add(border)

function updateCanvasSize(type = "full") {
    let height = window.innerHeight;
    let width = window.innerWidth;
    if (type == "sqr")
        canvas.setDimensions({ width: height, height: height });
    else if (type == "full")
        canvas.setDimensions({ width: width, height: height });
    else
        console.log("!- Canvas size type of " + type + " is not defined");
    //updateBorder()
}

updateCanvasSize()


function setNormality(obj) {
    obj.set({
        borderColor: 'black',
        cornerColor: 'balck',
        cornerSize: 45,
        cornerStyle: 'circle',
        centeredRotation: true,
    });

    obj.setControlVisible("mr", false)
    obj.setControlVisible("ml", false)
    obj.setControlVisible("mt", false)
    obj.setControlVisible("mb", false)
}


function addImg(name) {
    fabric.Image.fromURL(name, function (oImg) {
        // scale image down, and flip it, before adding it onto canvas
        oImg.scale(0.3)
        oImg.set({
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
            originX: 'center',
            originY: 'center',
        })
        canvas.setActiveObject(oImg);
        setNormality(oImg)
        canvas.add(oImg);
    });
}

var mainImgs =
    {
        path: "images/",
        number: 3,
        wantedNumber: 30
    }

function initMainImgs() {
    for (let i = 1; i <= mainImgs.number; i++) {
        curImg = mainImgs.path + i + ".png"
        console.log(curImg);
        addImg(curImg)
    }
}

var selectedObj = canvas.getActiveObject()

document.addEventListener("mousewheel", e => {
    let dir = Math.sign(e.deltaY);
    //console.log(canvas.getActiveObject().scaleX+(0.05*dir));

    //canvas.getActiveObject().scale(parseFloat(  canvas.getActiveObject().scaleX+(0.05*dir)  ))
    //canvas.renderAll();

})

document.addEventListener("keydown", e => {
    console.log(e.keyCode);

    if (e.keyCode == 49) {
        canvas.getActiveObject().set('flipX', !canvas.getActiveObject().flipX);
        canvas.renderAll();
    }
    if (e.keyCode == 50) {
        canvas.getActiveObject().set('flipY', !canvas.getActiveObject().flipY);
        canvas.renderAll();
    }
    if (e.keyCode == 40) {
        canvas.sendBackwards(canvas.getActiveObject())
        canvas.renderAll();
    }
    if (e.keyCode == 38) {
        canvas.bringForward(canvas.getActiveObject())
        canvas.renderAll();
    }

})


//initMainImgs()
// <div class="imgLibElement" onclick=""><img src="images/1.png" alt=""></div>


var libBox = document.getElementById("imgLibBox")

function fillLib() {
    var T = 0;
    for (let i = 1; i <= mainImgs.number; i++) {
        T++;
        curImg = mainImgs.path + i + ".png"
        libBox.innerHTML += `<div class="imgLibElement" onclick="addImg('` + curImg + `'); closeNav()"><img src="` + curImg + `" alt=""></div>`;
        if(i == mainImgs.number && !(T >= mainImgs.wantedNumber))
        {
            i = 0
        }
    }
}
fillLib()

function duplObj() {
    if (canvas.getActiveObjects().length == 0)
        alert("Выделите те объекты, котроые хотите дублировать!")
    else if (canvas.getActiveObjects().length == 1) {
        canvas.getActiveObject().clone(function (o) {
            var vobj = o;
            if (vobj) {
                let lastElem = canvas.size() - 1;
                vobj.left -= 30
                canvas.setActiveObject(vobj);

                setNormality(vobj)

                canvas.add(vobj);
                canvas.renderAll();
            } else {
                alert("Sorry Object Not Initialized");
            }
        })
    }
    else if (canvas.getActiveObjects().length > 1)
        alert("Вы можете копировать только один объект!")
    else
        alert("Что-то пошло не так...")
};

function mirrorObj(type) {
    if (type == "vert") {
        canvas.getActiveObject().set('flipX', !canvas.getActiveObject().flipX);
        canvas.renderAll();
    }
    else if (type == "horiz") {
        canvas.getActiveObject().set('flipY', !canvas.getActiveObject().flipY);
        canvas.renderAll();
    }
    else
        console.log("!-Can't mirror an object with type", type);
}

function moverLayer(type) {
    if (type == "down") {
        canvas.sendBackwards(canvas.getActiveObject())
        canvas.renderAll();
    }
    else if (type == "up") {
        canvas.bringForward(canvas.getActiveObject())
        canvas.renderAll();
    }
    else
        console.log("!-Can't move an to layer with type", type);
}

function delObj() {
    if (canvas.getActiveObjects().length == 0)
        alert("Выделите те объекты, котроые хотите удалить!")
    else if (canvas.getActiveObjects().length == 1) {
        var conf = confirm("Вы точно хотите удалить этот объект?");
        if (conf == true)
            canvas.remove(canvas.getActiveObject());
    }
    else if (canvas.getActiveObjects().length > 1) {
        var conf = confirm("Вы точно хотите удалить эти объекты?");
        if (conf == true) {
            canvas.getActiveObjects().forEach(element => {
                canvas.remove(element);
            });
        }
    }
    canvas.discardActiveObject().renderAll();
}


function updateBorder() {
    border.set('left', window.innerWidth / 2)
    border.set('width', window.innerHeight)
    border.set('height', window.innerHeight - 8)
}

border.evented = false;
border.controls = false;
border.selectable = false;

// canvas.on('mouse:down', function (opt) {
//     var evt = opt.e;
//     if (canvas.getActiveObjects().length == 0) {
//         this.isDragging = true;
//         this.selection = false;
//         this.lastPosX = evt.clientX;
//         this.lastPosY = evt.clientY;
//     }
// });
// canvas.on('mouse:move', function (opt) {
//     if (this.isDragging) {
//         var e = opt.e;
//         this.viewportTransform[4] += e.clientX - this.lastPosX;
//         this.viewportTransform[5] += e.clientY - this.lastPosY;
//         this.requestRenderAll();
//         this.lastPosX = e.clientX;
//         this.lastPosY = e.clientY;
//     }
// });
// canvas.on('mouse:up', function (opt) {
//     this.isDragging = false;
//     this.selection = true;
// });


function save() {
    // let imgData = ctx.getImageData(0, 0, 50, 50);
    // let img = canvasHtml.toDataURL('image/jpeg', 1.0);
    // console.log(imgData);
    // console.log(img);
    if (window.innerWidth > window.innerHeight)
        Canvas2Image.saveAsJPEG(canvasHtml, window.innerHeight, window.innerHeight)
    else if (window.innerWidth < window.innerHeight)
        Canvas2Image.saveAsJPEG(canvasHtml, window.innerWidth, window.innerWidth)
    else if (window.innerWidth = window.innerHeight)
        Canvas2Image.saveAsJPEG(canvasHtml, window.innerWidth, window.innerHeight)

}