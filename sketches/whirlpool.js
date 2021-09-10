import { frozen, mapfunction, normal } from "../src/p5js/templates";
import { pipe, raisetopower, repeat } from "../src/fns";
import { grayscale, pallettes, randpallette } from "../src/colours";
import { sketch } from "../src/p5js/composition";
import { smoothstep } from "../src/maths/mappings";
import { vector } from "../src/vec";
import { Circle } from "../src/shapes";
import { spiral } from "../src/distortions";
import { noiseofnoise, perlindistortion } from "../src/pretty";
import { noise, noisedetail } from "../src/maths/perlinnoise";
import { squaressin } from "../src/maths/trig";

const scale = 0.005,
    // rapidity = 30,
    octaves = 5,
    falloff = 0.6,
    freq = 0.3,
    stretch = 0.1;

const sscale = 0.005;
const dscale = 0.02;
const damplt = 100;
const rapidity = 10;

noisedetail(octaves, falloff)


let _c = grayscale(255);
const color = (val) => _c[Math.floor(val * _c.length)]

let circle;
function setup(p5) {
    const { width: w, height: h } = p5
    circle = new Circle(vector(w / 2, h / 2), Math.min(w / 2, h / 2) * 0.8)
}

const fn = pipe(
    p => spiral(circle, freq, raisetopower(3), stretch)(p),
    noiseofnoise(scale, rapidity),
    repeat(smoothstep, 3),
    color
)


// const f = pipe(
//     p => spiral(circle, freq, raisetopower(3), stretch)(p),
//     perlindistortion(dscale, damplt),
//     p => squaressin(p.times(sscale)),
//     (n) => noise(n * rapidity),
//     repeat(smoothstep, 2),
//     color
// )

sketch.compose(...normal, frozen, mapfunction(fn),
    { setup }
)