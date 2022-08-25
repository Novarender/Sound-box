function render(cam, screen, p) {
    let d = p.sub(cam.pos);
    let a = Math.sqrt(3) / 2 * screen.x / d.z;

    return vadd(screen.mult(0.5), d.mult(a));
}