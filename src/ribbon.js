import { assertordered, pairs } from "./util";
import { map, smoothstep } from "./maths/mappings";

const crop = (points, lo, hi) => {
    let [lmin, lmax] = [0, 0]
    const newpoints = []

    for (const [a, b] of pairs(points)) {
        const disp = b.minus(a)
        lmin = lmax; lmax += disp.mag

        if (lmax < lo) continue
        if (lmin >= lo) {
            newpoints.push(a)
        } else {
            const lambda = (lo - lmin) / disp.mag
            const p = disp.times(lambda).plus(a)
            newpoints.push(p)
        }
        if (lmax >= hi) {
            const lambda = 1 - (lmax - hi) / disp.mag
            const p = disp.times(lambda).plus(a)
            newpoints.push(p)
            break;
        }
    }
    return newpoints
}

const pathlength = (points) => {
    let length = 0
    for (const [a, b] of pairs(points)) {
        length += b.minus(a).mag
    }
    return length
}

const ribbon = (points, data = {}) => {
    return {
        points,
        length: pathlength(points),

        offset: 0,
        period: 1,
        smooth: smoothstep,
        maxl: 0.3,

        at: function (t) {
            if (t === undefined) return this._at(0, 1)

            t = (t + this.offset) % (this.period)
            t = map(
                t,
                0, this.period,
                -this.maxl / 2, 1 + this.maxl / 2
            )

            const lo = Math.max(t - this.maxl / 2, 0)
            const hi = Math.min(t + this.maxl / 2, 1)

            return this._at(this.smooth(lo), this.smooth(hi))
        },
        _at: function (lo, hi) {
            assertordered(0, lo, hi, 1)
            lo *= this.length; hi *= this.length
            return crop(this.points, lo, hi)
        },
        ...data
    }
}

export { crop, pathlength, ribbon }