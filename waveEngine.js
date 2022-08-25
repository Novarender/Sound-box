let raySpeed = 0.001;    // per ms
let maxSteps = 10;       // per frame

    // Normalized n
function reflect(a, n) {
    let k = 2 * a.dot(n);
    return vsub(a, n.mult(k));
}

    // Constructed via 3 points: the base, and 2 adjacent vertices
    // 2 vector edges
class Plane {
    constructor(a, b, c) {
        this.pos   = a;
        this.edgeA = b.sub(a);
        this.edgeB = c.sub(a);
        this.norm  = vcross(this.edgeA, this.edgeB).norm();
    }
}

    // A Ray is actually a particle with direction
class Ray {
    constructor(pos, dir) {
        this.pos  = pos;
        this.dir  = dir.norm();
        this.tail = pos.copy();    // Just for drawing
    }

        // t in ms
    step(t, planes) {
            // Can rebound multiple times within a tick
        for(let i = 0; i < maxSteps; i++) {
            let stepDist = raySpeed * t;
            let intersection = this.findNextPlane(stepDist, planes);
            let p = intersection[0];
            let d = intersection[1];

            
            t *= 1 - d / stepDist;    // Calculate remaining time
            this.pos.mutadd(this.dir.mult(d));
            if (p) {
                this.dir = reflect(this.dir, p.norm);
                this.tail = this.pos.copy();
            }

            if (t < 1e-13)  break;
        }
    }

        // Returns first collided plane & resultant step dist
    findNextPlane(stepDist, planes) {
        let closest = [undefined, Infinity];

        for(let i = 0; i < planes.length; i++) {
            let p = planes[i];
            let d = this.projectionDist(p);

                // 1e-15 is for precision issues
            if (d > 1e-15 && d < stepDist + 1e-15) {        // projection within step?
                if (d > closest[1])    continue;    // not breaking any records
                
                let proj = vadd(this.pos, this.dir.mult(d)).sub(p.pos);  // projected point relative to plane pos
                
                let A = p.edgeA.mag();
                let B = p.edgeB.mag();
                let u = proj.dot(p.edgeA) / A;
                let v = proj.dot(p.edgeB) / B;
                
                if (u > -1e-15 && u < A + 1e-15 && v > -1e-15 && v < B + 1e-15) {   // projection within plane?
                    closest = [p, d];
                }
            }
        }

        closest[1] -= 1e-15;    // Catches precision errors by culling back the projection dist; the system fails when the ray lands perfectly in a corner sometimes, so this prevents that.
        if (closest[0]) return closest;
        return [undefined, stepDist];
    }

        // To a plane
    projectionDist(p) {
        return vdot(vsub(p.pos, this.pos), p.norm) / vdot(this.dir, p.norm);
    }
}
