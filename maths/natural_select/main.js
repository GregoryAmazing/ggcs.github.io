function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

class Mob {
    constructor(x, y, target = undefined, speed = 7) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.target = target;
        this.angle = 0;
    }

    draw() {
        colorMode(HSB);
        fill(123, 204, 100);
        strokeWeight(4);
        circle(this.x, this.y, 32);
    }

    update() {
        if (this.target) {
            let side = abs(this.x - this.target.x);
            let angleSine =
                side / dist(this.x, this.y, this.target.x, this.target.y);
            this.angle = asin(angleSine);

            this.x += this.speed * cos(this.angle);
            this.y += this.speed * sin(this.angle);
        }
        if (this.x >= window.innerWidth) {
            console.log('Dead!');
        }
    }
}

var mobs = [new Mob(150, 150), new Mob(400, 500)];

mobs[0].target = mobs[1];

function draw() {
    background(256);
    for (let i = 0; i < mobs.length; i++) {
        mobs[i].update();
        mobs[i].draw();
    }
}
