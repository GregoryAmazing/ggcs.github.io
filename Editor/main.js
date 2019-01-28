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


window.onload = function () {
    console.log('all done loading!');
    //openNav()
    setTimeout(() => {
        console.log('ready to use!');
    }, 1000);
}

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

var loadingImgs = 0

var loadAnim = document.getElementById('loadAnim')

function startLoad() {
    loadAnim.style.display = 'inline-block'
    loadingImgs++;
}

function reqEnd() {
    loadingImgs--;
    if (loadingImgs <= 0) {
        loadingImgs = 0
        loadAnim.style.display = 'none'
    }
}

function addImg(name, tuneScale = true) {

    console.log('loading...', name);
    startLoad()

    fabric.Image.fromURL(name, function (oImg) {
        // scale image down, and flip it, before adding it onto canvas
        if (tuneScale)
            oImg.scale(0.6)
        oImg.set({
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
            originX: 'center',
            originY: 'center',
        })
        canvas.add(oImg);
        canvas.setActiveObject(oImg)
        setNormality(oImg)
        canvas.renderAll()

        console.log('loaded:', name)
        reqEnd()
    });
}

var selectedObj = canvas.getActiveObject()

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

function setBGColor(color = '#ffffff') {
    canvas.backgroundColor = color;
    canvas.renderAll()
}

setBGColor()



var libBox = document.getElementById("imgLibBox")
var colorBox = document.getElementById("colorBox")



function readmultifiles(e) {
    const files = e.currentTarget.files;
    Object.keys(files).forEach(i => {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
                //server call for uploading or reading the files one-by-one
                //by using 'reader.result' or 'file'
                addImg(reader.result);
            }
            reader.readAsDataURL(file);
        })
};

var BG =
{
    colors: ['#FFFFFF', '#AFDBCC', '#E3D771', '#B6CDED', '#F9D2E5']
}

function fillColors() {
    for (let i = 0; i < BG.colors.length; i++) {
        curColor = BG.colors[i]

        console.log(curColor);

        colorBox.innerHTML += `<div class="colorBoxElement" onclick="setBGColor('` + curColor + `')"></div>`;
        document.getElementsByClassName('colorBoxElement')[i].style.backgroundColor = curColor
    }
}

fillColors()

function setAsBackground() {
    if (canvas.getActiveObjects().length == 0)
        alert("Выделите тот объект, котроый хотите поставить как фоновое изображение!")
    else if (canvas.getActiveObjects().length == 1) {
        canvas.setBackgroundImage(canvas.getActiveObject().getSrc());
        canvas.renderAll();
    }
}


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

/*     moving canvas around test
canvas.on('mouse:down', function (opt) {
    var evt = opt.e;
    if (canvas.getActiveObjects().length == 0) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
    }
});
canvas.on('mouse:move', function (opt) {
    if (this.isDragging) {
        var e = opt.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
    }
});
canvas.on('mouse:up', function (opt) {
    this.isDragging = false;
    this.selection = true;
});
*/


function randomId(length) {
    let id = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        id += chars.charAt(Math.floor(Math.random() * chars.length));

    return id;
}

var fileName = '';

function save() {
    let link = document.getElementById('downloadLink')
    fileName = randomId(10)
    canvas.discardActiveObject().renderAll();
    link.setAttribute('download', fileName + '.jpg')
    link.setAttribute('href', canvasHtml.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}

function uploadToServer() {
    var canvasData = canvasHtml.toDataURL("image/png");
    $.ajax({
        url: 'upload.php',
        type: 'POST',
        success: function () { },
        data: {
            data: canvasData,
            name: fileName
        },
        dataType: 'json',
        async: false,
    });
    console.log(fileName);
}

function sendMail() {
    let href = 'http://lbschool.fotoblic.ru/LookBookEditor/user_uploads/' + fileName + '.jpg';
    let qanda = prompt("Укажите имейл на который надо отправить фото: ", "someone@example.com")
    if (qanda == null || qanda == "") {
        return;
    } else {
        $.ajax({
            url: 'mail.php',
            type: 'POST',
            success: function () { },
            data: {
                link: href,
                name: qanda
            },
            dataType: 'json',
            async: false,
        });
    }
}
