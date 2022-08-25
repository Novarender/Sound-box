    // Basic vector library

class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    norm() {
        return this.div(this.mag());
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    mult(s) {
        return new Vector(this.x * s, this.y * s, this.z * s);
    }

    div(s) {
        return this.mult(1 / s);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v) {
        return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }

    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    // Mutations

    mutmag(l) {
        return this.mult(l / this.mag());
    }

    mutnorm() {
        return this.mutdiv(this.mag());
    }

    mutadd(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    mutsub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    mutmult(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    mutdiv(s) {
        return this.mutmult(1 / s);
    }
}

const vadd =    (a, b) => a.add(b);
const vsub =    (a, b) => a.sub(b);
const vmult =   (a, b) => a.mult(b);
const vdiv =    (a, b) => a.div(b);
const vdot =    (a, b) => a.dot(b);
const vcross =  (a, b) => a.cross(b);
const vmag =    a => a.mag();
const vnorm =   a => a.norm();
const vcopy =   a => a.copy();
