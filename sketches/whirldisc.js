import { frozen, mapfunction, normal } from "../src/p5js/templates";
import { pipe, raisetopower, repeat } from "../src/fns";
import { grayscale, pallettes, randpallette } from "../src/colours";
import { sketch } from "../src/p5js/composition";
import { lerp, map, smoothstep } from "../src/maths/mappings";
import { vector } from "../src/vec";
import { Circle, Donut } from "../src/shapes";
import { spiral } from "../src/distortions";
import { noiseofnoise } from "../src/pretty";
import { noisedetail } from "../src/maths/perlinnoise";
import { random } from "../src/maths";

const scale = 0.005,
    rapidity = 30,
    octaves = 5,
    falloff = 0.6,
    freq = 0.1,
    stretch = 0.05;

noisedetail(octaves, falloff)


let _c;
const color = (val) => _c[Math.floor(val * _c.length)]

let donut;
function setup(p5) {
    const { width: w, height: h } = p5
    _c = pallettes.child
    const R = Math.min(w / 2, h / 2) * 0.8;
    const r = R * random(0.1, 0.6)
    donut = new Donut(vector(w / 2, h / 2), r, R)
}

const _basefn = pipe(
    noiseofnoise(scale, rapidity),
    repeat(smoothstep, 3),
    // color
)

function distorted(fn) {
    return p => {
        if (!donut.contains(p)) return color(fn(p))

        const { centre, r, R } = donut
        const disp = p.minus(centre)
        const lambda = smoothstep(map(disp.mag, r, R, 0, 1))
        const thetaR = -(1 - lambda) * freq * Math.PI * 2
        const thetar = lambda * freq * Math.PI * 2
        const innerpoint = disp.direction.times(r * (1 + lambda * stretch)).rotatedby(thetar).plus(centre)
        const outerpoint = disp.direction.times(R * (1 - (1 - lambda) * stretch)).rotatedby(thetaR).plus(centre)
        return color(lerp(lambda, fn(innerpoint), fn(outerpoint)))
    }
}

sketch.compose(...normal, frozen, mapfunction(distorted(_basefn)),
    { setup }
)