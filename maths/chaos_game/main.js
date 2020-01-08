canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let cx = canvas.getContext('2d');

function $(selector) {
    return document.querySelector(selector);
}

function point(obj, color = 'black', radius = 1) {
    cx.fillStyle = color;
    cx.beginPath();
    cx.arc(obj.x, obj.y, radius, 0, 2 * Math.PI);
    cx.fill();
}

function fillScreen(color) {
    cx.fillStyle = color;
    cx.fillRect(0, 0, canvas.width, canvas.height);
}

fillScreen('white');

function lerp(a, b, frac) {
    // points A and B, frac between 0 and 1
    let nx = a.x + (b.x - a.x) * frac;
    let ny = a.y + (b.y - a.y) * frac;
    return { x: nx, y: ny };
}

function genPoints(nSides) {
    let corners = nSides;
    let radius = 0;
    let points = [];
    if (canvas.width >= canvas.height)
        radius = (canvas.height / 2 - 30) * scale;
    else radius = (canvas.width / 2) * scale;

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
            let x = Math.round(Math.sin(a) * -radius);
            let y = Math.round(Math.cos(a) * -radius);
            points.push({ x: x, y: y });
        }
    }
    return points;
}

let R = 0.5;
let N = 6;
let rules = { CVINP: false, CVIN2PAFP: false};
let serp_carpet = [
    { x: 100, y: 100 },
    { x: 300, y: 100 },
    { x: 500, y: 100 },
    { x: 100, y: 300 },
    { x: 100, y: 500 },
    { x: 300, y: 500 },
    { x: 500, y: 300 },
    { x: 500, y: 500 }
];
let ittrs = 0;
let loop;
let scale = 1;
const speed = 1;

let main_points = [];
let chaos_point = { x: 0, y: 0 };

let prev;
let prevPointNum;

function setRule(rule) {
    Object.keys(rules).forEach(v => rules[v] = false)
    rules[rule] = true;
}

function start(n, r, customShape = null, timer = 400) {
    N = n;
    R = r;
    reset();
    if (customShape == null) main_points = genPoints(N);
    else main_points = customShape;

    main_points.forEach(pnt => {
        if (customShape == null) {
            pnt.x += 100 + canvas.width / 2;
            pnt.y += canvas.height / 2;
        }
        point(pnt, (color = 'blue'), (radius = 3));
    });

    loop = setInterval(() => {
        cx.fillStyle = 'white';
        cx.fillRect(245, 17, 200, 24);
        cx.fillStyle = 'black';
        cx.font = '18px Arial';
        cx.fillText('Iterations: ' + ittrs, 250, 35);

        for (let i = 0; i < 100; i++) {
            let nextPointNum = Math.floor(Math.random() * main_points.length)
            let next = main_points[nextPointNum];
            if (rules.CVINP) {
                if (next !== prev) { placeNewPoint(next) }
            } if (rules.CVIN2PAFP) {
                // TO DO: текущая выбранная вершина не может быть в 2 местах от ранее выбранной вершины.
            }
            else { placeNewPoint(next) }
            prevPointNum = nextPointNum;
            prev = next;
        }

        ittrs++;
        if (ittrs > timer) {
            stop();
        }
    }, speed);
}

function placeNewPoint(nextPoint) {
    chaos_point = lerp(chaos_point, nextPoint, (r = R));
    point(chaos_point, (color = 'black'), (radius = 0.5));
}

function start_html() {
    start(
        JSON.parse($('#N').value),
        JSON.parse($('#R').value),
        (customShape = null),
        (timer = JSON.parse($('#timer').value))
    );
}

document.addEventListener('keydown', e => {
    if (e.keyCode == 13) {
        switch (document.activeElement) {
            case $('#N'):
                $('#R').focus();
                break;
            case $('#R'):
                $('#timer').focus();
                break;
            case $('#timer'):
                start_html();
                break;
            default:
                break;
        }
    }
});

let fractal_rules = [
    { n: 3, r: 0.5 },
    { n: 4, r: 0.6 },
    { n: 5, r: 0.6 },
    { n: 6, r: 0.6 },
    { n: 7, r: 0.6 },
    { n: 8, r: 0.6 },
    { n: 15, r: 0.75 }
];
let fractal_index = 1;

function reset() {
    ittrs = 0;
    clearInterval(loop);
    fillScreen('white');
}

function stop() {
    ittrs = 0;
    clearInterval(loop);
}

//start(fractal_rules[0].n,fractal_rules[0].r)
