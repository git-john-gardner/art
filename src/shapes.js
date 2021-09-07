export class Circle {
    constructor(centre, r) {
        this.centre = centre;
        this.r = r
    }
    contains(p) {
        return p.minus(this.centre).mag < this.r
    }
}