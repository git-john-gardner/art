import { Vector } from "./vec";

export class Circle {
    constructor(centre, r) {
        this.centre = centre;
        this.r = r
    }
    contains(p) {
        return p.minus(this.centre).mag < this.r
    }
    pointonperimeter(turns) {
        return Vector.fromAngle(turns * 2 * Math.PI).times(this.r).plus(this.centre)
    }
}

const ascending = (...arr) => {
    if (arr.length == 1) arr = [...arr]
    let result = true
    const reducer = (a, b) => {
        if (a > b) result = false
        return b
    }
    arr.reduce(reducer)
    return result
}

export class Square {
    constructor(centre, r) {
        this.centre = centre
        this.r = r
    }
    contains(p) {
        const { x: cx, y: cy } = this.centre
        return ascending(cx - this.r, p.x, cx + this.r)
            && ascending(cy - this.r, p.y, cy + this.r)
    }
}

export class Donut {
    constructor(centre, r, R) {
        this.centre = centre
        this.r = r
        this.R = R
        this._inner = new Circle(centre, r)
        this._outer = new Circle(centre, R)
    }
    contains(p) {
        return this._outer.contains(p) && !this._inner.contains(p)
    }
}


function _sign(p1, p2, p3) {
    // return p3.minus(p2).cross(p1.minus(p2)).mag
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
}

export class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1
        this.p2 = p2
        this.p3 = p3
    }
    contains(p) {
        const d1 = _sign(p, this.p1, this.p2)
        const d2 = _sign(p, this.p2, this.p3)
        const d3 = _sign(p, this.p3, this.p1)

        const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

        return !(has_neg && has_pos);

    }
}