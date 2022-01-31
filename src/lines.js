export class LineSegment {
    constructor(p1, p2) {
        this.p1 = p1
        this.p2 = p2
    }
    get gradient() {
        return this.p2.minus(this.p1)
    }
    distanceto(other) {
        const c = this.gradient.direction.cross(other.gradient.direction)
        const parallell = c.mag == 0
        if (parallell) return this.distancetoparallell(other)

    }
    distancetoparallell(other) {

    }
    crosses(other) {
        return this.distanceto(other) === 0
    }
}