import { grayscale, pallettes, randpallette } from "../src/colours";
import { pipe, repeat } from "../src/fns";
import { noise } from "../src/maths/perlinnoise";
import { sketch } from "../src/p5js/composition";
import { frozen, mapfunction, normal } from "../src/p5js/templates";
import { perlindistortion } from "../src/pretty";
import { Circle, Donut, Square } from "../src/shapes";
import { range } from "../src/util";
import { Vector, vector } from "../src/vec";

const scale = 0.003, amp = 200;

function sumvecs(vecs) {
    return vecs.reduce((a, b) => a.plus(b), vector(0, 0))
}

const curldistortion = p => {
    const dtheta = 0.1, faloff = 0.7, N = 6;
    const disp = Vector.fromAngle(noise(p.x * scale, p.y * scale) * 50)
    const disps = range(N).map(i => disp.rotatedby(i * dtheta).times(amp * faloff ** i))
    return sumvecs(disps).plus(p)
}

const sep = 15, thickness = 0.2;
const fn = pipe(
    // curldistortion,
    repeat(perlindistortion(scale, amp), 3),
    p => Math.abs(p.x / sep) % 1 > thickness
        && Math.abs(p.y / sep) % 1 > thickness
)
const colour = x => x * 255

sketch.compose(...normal, frozen, mapfunction(fn, colour))