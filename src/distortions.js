import { map, smoothstep } from "./maths/mappings"
import { Circle } from "./shapes"

export function spiral(circle, freq = 1, pow = 2) {
    return p => {
        if (!circle.contains(p))
            return p

        const disp = p.minus(circle.centre)
        const theta = smoothstep(1 - disp.mag / circle.r) * freq * Math.PI * 2
        return disp.direction.rotatedby(theta).times(circle.r).plus(circle.centre)
    }
}


class Donut {
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

export function donut(donut, freq = 1, pow = 2) {
    return p => {
        if (!donut.contains(p)) return p

        const lambda = map(p.minus(donut.centre).mag, donut.r, donut.R, 0, 1)


    }
}