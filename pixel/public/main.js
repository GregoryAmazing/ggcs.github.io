let squaresX = 16
let squaresY = 16
let squareSize = 40

let offsetX = (window.innerWidth / 2) - (squaresX * (squareSize / 2))
let offsetY = (window.innerHeight / 2) - (squaresY * (squareSize / 2))

var colorChoice = "#0083c4";

let colorInput = document.getElementById("colorInput")

function updateColor(jscolor) {
    colorChoice = "#" + jscolor;
}

function changeColors(oldColor, newColor) {
    for (var x = 0; x < squaresX; x++) {
        for (var y = 0; y < squaresY; y++) {
            if (oldColor == "any")
                grid[x][y] = newColor;
            else if (grid[x][y] == oldColor)
                grid[x][y] = newColor;
        }
    }
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    grid = create2DArray();

    for (var x = 0; x < squaresX; x++) {
        for (var y = 0; y < squaresY; y++) {
            grid[x][y] = 0;
        }
    }
}

function create2DArray() {

    var arr = new Array(squaresX);
    for (var x = 0; x < arr.length; x++) {
        arr[x] = new Array(squaresX);
    }

    return arr;
}


function fillGrid() {

    background(255);
    strokeWeight(1);
    stroke(0);

    for (var x = 0; x < squaresX; x++) {
        for (var y = 0; y < squaresY; y++) {
            if (grid[x][y] != 0) {
                let cell = grid[x][y]
                fill(cell)
            } else {
                fill(255);
            }
            rect(x * squareSize + offsetX, y * squareSize + offsetY, squareSize - 1, squareSize - 1);
        }
    }
}

function draw() {
    fillGrid()
}

let mode = ""
let databaseloaded = false;

updMode("pen")

function updMode(toMode) {
    let disp = document.getElementById("modeDisplay")
    let modes = {
        "pen": "Pen",
        "ers": "Earser",
    }
    if (toMode == "invert") {
        if (mode == "pen")
            mode = "ers"
        else
            mode = "pen"
    }
    else
        mode = toMode
    disp.innerText = "Mode: " + modes[mode];
}


document.addEventListener("keydown", e => {
    //console.log(e.keyCode);
    if (e.keyCode == 69)
        updMode("ers")
    if (e.keyCode == 80)
        updMode("pen")
})

document.getElementById("idInput").addEventListener("keyup", e=>{
    if(e.keyCode == 13)
        connectionTry(document.getElementById("idInput").value)
})

function mousePressed() {
    for (var x = 0; x < squaresX; x++) {
        for (var y = 0; y < squaresY; y++) {
            if (mouseX > x * squareSize + offsetX && mouseX < x * squareSize + squareSize + offsetX && mouseY > y * squareSize + offsetY && mouseY < y * squareSize + squareSize + offsetY && databaseloaded) {
                if (mode == "pen") {
                    grid[x][y] = colorChoice;
                    deploy()
                } else {
                    grid[x][y] = 0;
                    deploy()
                }
                break;
            }
        }
    }
}

function dataRef(data, id)
{
    return firebase.database().ref('pixelBoards/'+id+"/"+data);
}

function existsCallBack(id, exists) {
    if (exists) {
        connectB(id)
        invDisp('boardMenu')
      } else {
        alert('Board "' + id + '" does not exist...');
      }
}

function connectionTry(id) {
    dataRef("name",BID).off()
    dataRef("cells",BID).off()
    firebase.database().ref('pixelBoards').child(id).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      existsCallBack(id, exists);
    });
}

function invDisp(elemId) {
    let elem = document.getElementById(elemId)

    if (elem.style.display == "none")
        elem.style.display = "block"
    else
        elem.style.display = "none"
}

var BID = ""

console.log("Verion 2");


function connectB(boardId="") {
    
if(boardId != "")
{
    dataRef("name",boardId).on('value', function (snapshot) {
        
        if (snapshot.val() != null) {
            document.getElementById("Name").innerText = snapshot.val()
        }
        else {
            dataRef("name",boardId).set("New Name");
        }
    });

    dataRef("cells",boardId).on('value', function (snapshot) {
        if (snapshot.val() != null) {
            //console.log("cells exist!");
            //console.log(snapshot.val());
            grid = snapshot.val();
            databaseloaded = true;
            BID = boardId
        }
        else {
            console.log("cells not found...");
            dataRef("cells",boardId).set(grid);
        }
    });
}
}

function deploy() {
    if(databaseloaded)
        dataRef("cells",BID).set(grid);
}