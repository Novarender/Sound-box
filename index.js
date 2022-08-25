let canvas;
let ctx;
let screen;

let cam = {
    pos: new Vector(0.5, 0.5, -3),
    rot: new Vector(0, 0, 0),
    vel: new Vector(0, 0, 0),
}
let keys = {};

let cube = [
    new Plane(new Vector(0, 0, 0), new Vector(0, 0, 1), new Vector(1, 0, 0)),
    new Plane(new Vector(0, 0, 0), new Vector(0, 0, 1), new Vector(0, 1, 0)),
    new Plane(new Vector(0, 0, 0), new Vector(1, 0, 0), new Vector(0, 1, 0)),
    new Plane(new Vector(1, 0, 0), new Vector(1, 0, 1), new Vector(1, 1, 0)),
    new Plane(new Vector(0, 0, 1), new Vector(1, 0, 1), new Vector(0, 1, 1)),
    new Plane(new Vector(0, 1, 0), new Vector(0, 1, 1), new Vector(1, 1, 0)),
]
cube[0].i = 0;
cube[1].i = 1;
cube[2].i = 2;
cube[3].i = 3;
cube[4].i = 4;
cube[5].i = 5;

let ray = new Ray(new Vector(0, 0, 0), new Vector(Math.random(), Math.random(), Math.random()));
let ray2 = new Ray(new Vector(0, 0, 0), new Vector(Math.random(), Math.random(), Math.random()));

window.addEventListener("keydown",  event =>  keys[event.key] = true);
window.addEventListener("keyup",    event =>  keys[event.key] = false);

function moveToPoint(p) {
    ctx.moveTo(p.x, p.y);
}

function lineToPoint(p) {
    ctx.lineTo(p.x, p.y);
}

function drawLine(a, b) {
    ctx.beginPath();
    moveToPoint(a);
    lineToPoint(b);
    ctx.stroke();
}

function renderPlane(v) {
    let a = render(cam, screen, v.pos);
    let b = render(cam, screen, v.pos.add(v.edgeA));
    let c = render(cam, screen, v.pos.add(v.edgeA).add(v.edgeB));
    let d = render(cam, screen, v.pos.add(v.edgeB));
    
    drawLine(a, b);
    drawLine(b, c);
    drawLine(c, d);
    drawLine(d, a);
}

function onTick() {
    if(keys.ArrowLeft)   cam.vel.x -= 0.023;
    if(keys.ArrowRight)  cam.vel.x += 0.023;
    if(keys.ArrowDown)   cam.vel.z -= 0.023;
    if(keys.ArrowUp)     cam.vel.z += 0.023;

    cam.pos = cam.pos.add(cam.vel);
    cam.vel = cam.vel.mult(0.89);

    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#ffffff';
    for(let i = 0; i < cube.length; i++)    renderPlane(cube[i]);

    ctx.strokeStyle = '#ff0000';
    drawLine(render(cam, screen, ray.tail), render(cam, screen, ray.pos));
    ray.step(1000/15, cube);
    // ctx.strokeStyle = '#0030df';
    // drawLine(render(cam, screen, ray2.tail), render(cam, screen, ray2.pos));
    // ray2.step(1000/15, cube);
}

function gOnLoad() {    
    canvas = document.querySelector("#render");
    ctx    = canvas.getContext("2d");
    screen = new Vector(canvas.width, canvas.height, 0);
    
        // settings
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1.8;

    setInterval(onTick, 1000/60);
}

window.onload = gOnLoad;