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