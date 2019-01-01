var sqPerLine = 70;
var offsetY = 0;

var w;
var grid;
var newGrid;
var keyP;
var randP;
var buttonP;
var startButton;
var check;

function setup() {
        createCanvas(1550, 750);
        w = floor(width / sqPerLine);
        grid = create2DArray();

        for (var i = 0; i < sqPerLine; i++) {
            for (var j = 0; j < sqPerLine; j++) {
                grid[i][j] = 0;
            }
        }

    keyP = false;
    randP = false;
    buttonP = true;
    check = false;
    play()
}

function itter() {
    
    if (!buttonP) {
        pageInit();
    } else if (randP && !keyP) {
        fillGrid();
    } else if (keyP == false) {
        fillGrid();
        check = true;
    } else {
        fillGrid();

        newGrid = create2DArray();

        for (var i = 0; i < sqPerLine; i++) {
            for (var j = 0; j < sqPerLine; j++) {

                var current = grid[i][j];
                var neighbours = countNearbyLives(i, j);

                if (current == 0 && neighbours == 3) {
                    newGrid[i][j] = 1;
                } else if (current == 1 && (neighbours < 2 || neighbours > 3)) {
                    newGrid[i][j] = 0;
                } else {
                    newGrid[i][j] = current;
                }
            }
        }

        grid = newGrid;
    }
}

function draw() {
    itter()
}

var menuOpened = false;

document.addEventListener("keydown", e=>{
    console.log(e.keyCode)
    if(e.keyCode == 80){
        playGame()//play/pause
    }
    if(e.keyCode == 82){
        randomise()
    }
    if(e.keyCode == 67){
        clean()
    }
    if(e.keyCode == 83){
        copyOriginal()//save
    }

    if(e.keyCode == 39){
        playGame({mode:"manual", state:"play"})
        itter()
        playGame({mode:"manual", state:"pause"})
    }
})

function invertMenu() {
    let menu = htmlID("menu")
    if (menu.style.display == "block") {
        menu.style.display = "none"
    } else {
        menu.style.display = "block"
    }
    menuOpened = !menuOpened
}

function htmlID(id)
{
    return document.getElementById(id)
}

window.onload=function(){
    document.getElementById("opener").addEventListener("change", function(){
        var fr = new FileReader();
        fr.onload = function(){
            console.log("File loaded: "+this.result);
            summonWithArray(this.result )
        }
        fr.readAsText(this.files[0]);
    })
}


var allMenus = ["main","summonM"]

function openMenuBtn(name) {
    allMenus.forEach(menu => {
        if(menu != name)
        {
            htmlID(menu).style.display = "none"
        }
        else
        {
            htmlID(menu).style.display = "block"
        }
    });
}

function mousePressed() {
    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (check && mouseX > i * w && mouseX < i * w + w && mouseY > j * w + offsetY && mouseY < j * w + w + offsetY && !menuOpened) {
                if (grid[i][j] == 0) {
                    grid[i][j] = 1;
                } else {
                    grid[i][j] = 0;
                }
                break;
            }
        }
    }
}



function clean() {
    playGame({mode:"manual", state:"pause"})
    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            grid[i][j] = 0;
        }
    }
}

function randomise() {
    playGame({mode:"manual", state:"pause"})
    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            grid[i][j] = floor(random(2));
        }
    }

}

function playGame({btn = {innerHTML:""}, mode = "auto", state = "play"}={}) {
    if(mode == "auto"){
        if (!keyP) {
            keyP = true;
            btn.innerHTML = "pause"
        } else if (keyP) {
            keyP = false;
            btn.innerHTML = "play"
        }
    } else if(mode == "manual"){
        if (state == "play") {
            keyP = true;
        } else if (state == "pause") {
            keyP = false;
        }
    }
    //console.log("end!"+mode+state)
}

function create2DArray() {

    var arr = new Array(sqPerLine);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(sqPerLine);
    }

    return arr;
}

function countNearbyLives(i, j) {

    var lives = 0;

    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < sqPerLine && j + y >= 0 && j + y < sqPerLine) {
                if (!(x == 0 && y == 0)) {
                    lives += grid[i + x][j + y];
                }
            }
        }
    }

    return lives;
}

function delval(e)
{
    e.value = ""
}

var saved = []

var glider = [[0,1],[1,2],[2,0],[2,1],[2,2]]

var lwss = [[0,0],[0,2],[1,3],[2,3],[3,0],[3,3],[4,1],[4,2],[4,3]]

var gosper_gun = [[0,4],[0,5],[1,4],[1,5],[10,4],[10,5],[10,6],[11,3],[11,7],[12,2],[12,8],[13,2],[13,8],[14,5],[15,3],[15,7],[16,4],[16,5],[16,6],[17,5],[20,2],[20,3],[20,4],[21,2],[21,3],[21,4],[22,1],[22,5],[24,0],[24,1],[24,5],[24,6],[34,2],[34,3],[35,2],[35,3]]

var galaxy =[[0,3],[0,6],[1,7],[2,8],[2,9],[3,2],[3,4],[3,5],[3,12],[4,2],[4,5],[4,9],[5,1],[5,5],[5,7],[5,8],[5,9],[6,0],[6,12],[7,3],[7,4],[7,5],[7,7],[7,11],[8,3],[8,7],[8,10],[9,0],[9,7],[9,8],[9,10],[10,3],[10,4],[11,5],[12,6],[12,9]]

function getArr(arr) {
    return JSON.stringify(arr)
}

function summonWithArray(cellArr, x = 0, y = 0) {
    let arr;
    if(typeof cellArr == "string"){
        arr = JSON.parse(cellArr)
        
    }else{
        arr = cellArr
    }
    
    arr.forEach(cell => {
        grid[cell[0] + x][cell[1] + y] = 1
    });
}

function summonWithName(cellArrname, x = 0, y = 0) {
    let cellArr = eval(cellArrname)
    
    cellArr.forEach(cell => {
        grid[cell[0] + x][cell[1] + y] = 1
    });
}

function saveCells() {
    saved = []
    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (grid[i][j] == 1) {
                saved.push([i ,j])
            } else {
                // do nothing
            }
        }
    }
}

function copyOriginal (){
    let array = []
    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (grid[i][j] == 1) {
                array.push([i ,j])
            } else {
                // do nothing
            }
        }
    }
    output.value = JSON.stringify(array)
}

function Comparator(a, b) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }

function copyZero() {
    let array = []
    let startI, startJ
    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (grid[i][j] == 1) {
                array.push([i ,j])
            } else {
                // do nothing
            }
        }
    }
    array.sort(Comparator)

    for (let i = 0; i < array.length; i++) {
        if(i == 0)
        {
            startI = array[i][0];
            startJ = array[i][1];
        }
        array[i][0] = array[i][0]-startI
        array[i][1] = array[i][1]-startJ
    }
    output.value = JSON.stringify(array)
}

function fillGrid() {

    background(255);
    strokeWeight(2);
    stroke(0, 0, 0, 50);

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (grid[i][j] == 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(i * w, j * w + offsetY, w - 1, w - 1);
        }
    }
}

function write(words) {

    strokeWeight(2);
    stroke(255);
    fill(0);
    textSize(19);
    text(words, 1, 20);
}

function play() {

    textAlign(LEFT);
}
