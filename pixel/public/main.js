let squaresX = 16
let squaresY = 16

let squareSize;

let offsetX;
let offsetY;

let gridSize;

let canvasHeight = window.innerHeight/1.538 - 32;

updateGrid()

function updateGrid() {
    let sidemargin = 14;
    offsetY = 70;

    if (canvasHeight-70>window.innerWidth)
    {
        squareSize = (window.innerWidth-sidemargin)/squaresX;
        offsetX = sidemargin/2;
    }
    else
    {
        squareSize = (canvasHeight-76)/squaresX;
        offsetX = (window.innerWidth/2) - (squaresX*squareSize/2)
    }

    gridSize = squaresX*squareSize;

   

        
}

function windowResized() {
    resizeCanvas(window.innerWidth, canvasHeight)
    updateGrid()
}

var colorChoice = "#000000";

let colorInput = document.getElementById("color")

let mode = "";

function updMode(toMode) {
    let toolbtns = document.querySelectorAll(".toolbtn");
    mode = toMode
    for (let i = 0; i < toolbtns.length; i++) {
        toolbtns[i].classList.remove("toolselect")

        if (toolbtns[i].id == toMode)
            toolbtns[i].classList.add("toolselect")
    }
}

updMode("pen")

let kcolorpicker = new KellyColorPicker({
    place : 'picker', 
    size : 200,
    userEvents : {
        change : function(self){
            colorChoice = self.getCurColorHex();
            updMode("pen")
        }
    }   
});

function swapColors(oldColor, newColor) {
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
    createCanvas(window.innerWidth, canvasHeight);
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

let databaseloaded = false;

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

let origMouseX = 0;
let origMouseY = 0;

function drawpixels() {
    for (var x = 0; x < squaresX; x++) {
        for (var y = 0; y < squaresY; y++) {
            if (mouseX > x * squareSize + offsetX && mouseX < x * squareSize + squareSize + offsetX && mouseY > y * squareSize + offsetY && mouseY < y * squareSize + squareSize + offsetY && databaseloaded) {
                if (mode == "pen") {
                    if (colorChoice == "#ffffff")
                        grid[x][y] = 0;
                    else
                        grid[x][y] = colorChoice;
                } else if (mode == "eraser"){

                    grid[x][y] = 0;

                } else if (mode == "dropper"){
                        
                    kcolorpicker.setColor(grid[x][y]);
                    updMode("pen")
                    
                }
                break;
            }
        }
    }
}

function mousePressed() {
    origMouseX = mouseX;
    origMouseY = mouseY;
}

function mouseDragged() {
    if(
        origMouseX > offsetX &&
        origMouseX < offsetX + gridSize &&
        origMouseY > offsetY &&
        origMouseY < offsetY + gridSize)
    {
        drawpixels()
    }
}

function mouseReleased() {
    if(
        origMouseX > offsetX &&
        origMouseX < offsetX + gridSize &&
        origMouseY > offsetY &&
        origMouseY < offsetY + gridSize)
    {
        drawpixels()
        deploy()
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
        console.log(">> Connected to "+id);
      } else {
        alert('Board "' + id + '" does not exist...');
      }
}

function connectionTry(id) {
    console.log("Conection started...");
    dataRef("name",BID).off()
    dataRef("cells",BID).off()
    firebase.database().ref('pixelBoards').child(id).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      existsCallBack(id, exists);
    });
    console.log("Conection ended.");
}

function invDisp(elemId) {
    let elem = document.getElementById(elemId)

    if (elem.style.display == "none")
    {
        elem.style.display = "flex"
    }
    else
    {
        elem.style.display = "none"
        console.log("menu invis");
        
    }
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
    {
        dataRef("cells",BID).set(grid)
        console.log("Deployed!");
    }
}