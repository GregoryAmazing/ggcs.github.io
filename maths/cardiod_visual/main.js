canvas = document.querySelector('canvas');

let botttom_offset = 220;

canvas.height = window.innerHeight-botttom_offset;
canvas.width = window.innerWidth;

let cx = canvas.getContext('2d');
let scale = 1;

let dpi = window.devicePixelRatio;

function fix_dpi() {
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

function $(selector) {
    return document.querySelector(selector);
}

function point(pointobj, color = 'red', radius = 1) {
    cx.fillStyle = color;
    cx.beginPath();
    cx.arc(pointobj.x, pointobj.y, radius, 0, 2 * Math.PI);
    cx.fill();
}

function draw_points(poins_array) {
    poins_array.forEach(pnt => {
        point(pnt, (color = '#c52e2e'), (radius = 3));
    });
}

function line(pointobj1, pointobj2, color = 'white') {
    cx.strokeStyle = color;
    cx.beginPath();
    cx.moveTo(pointobj1.x, pointobj1.y);
    cx.lineTo(pointobj2.x, pointobj2.y);
    cx.stroke();
    cx.closePath();
}

function fillScreen(color) {
    cx.fillStyle = color;
    cx.fillRect(0, 0, canvas.width, canvas.height);
}

fillScreen('black');

function genPoints(nSides) {
    let corners = nSides;
    let radius = 0;
    let points = [];
    if (canvas.width >= canvas.height)
        radius = (canvas.height / 2) * scale -40;
    else radius = (canvas.width / 2) * scale -10;

    if (corners == 4) {
        radius *= scale * 2;
        let zero = -radius / 2;
        points.push(
            { x: zero, y: zero },
            { x: zero + radius, y: zero },
            { x: zero, y: zero + radius },
            { x: zero + radius, y: zero + radius }
        );
    } else {
        let angle = (Math.PI * 2) / corners;
        for (let i = 0; i < corners; i++) {
            let a = angle * i;
            //sin and cos are swithced,point 0 is bottom one
            let x = Math.round(Math.sin(a) * radius);
            let y = Math.round(Math.cos(a) * -radius);
            x += canvas.width / 2;
            y += canvas.height / 2;
            points.push({ x: x, y: y });
        }
    }
    return points;
}

let multiplier = 2;
let point_num = 100;

function redraw() {
    fillScreen('black');
    let points = genPoints(point_num);
    draw_points(points);
    points.forEach(function(pnt, index) {
        let nextpntindex = (index * multiplier) % point_num;
        if (nextpntindex > point_num) nextpntindex - point_num;

        line(points[index], points[nextpntindex]);
    });
}

function updateValRender(rendererID, val) {
    $(rendererID).innerText = val;
}

function update() {
    multiplier = $('#M').value;
    point_num = $('#N').value;
    redraw();
}

function canvas_update() {
    canvas.height = window.innerHeight-botttom_offset;
    canvas.width = window.innerWidth;
    fix_dpi()
    update();
}

window.onresize = () => {
    canvas_update()
}

update();
