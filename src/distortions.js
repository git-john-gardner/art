import { map, smoothstep } from "./maths/mappings"
import { noise } from "./maths/perlinnoise"
import { Circle } from "./shapes"

export function spiral(circle, freq = 1, smooth = x => x, stretch = 0.2) {
    return p => {
        if (!circle.contains(p))
            return p

        const disp = p.minus(circle.centre)

        // proportion from edge of circle to centre
        const lambda = 1 - disp.mag / circle.r

        const theta = smooth(lambda) * freq * Math.PI * 2

        return disp.direction.rotatedby(theta).times(circle.r * (1 - lambda * stretch)).plus(circle.centre)
    }
}

export function donut(donut, freq = 1, pow = 2) {
    return p => {
        if (!donut.contains(p)) return p

        const lambda = map(p.minus(donut.centre).mag, donut.r, donut.R, 0, 1)


    }
}