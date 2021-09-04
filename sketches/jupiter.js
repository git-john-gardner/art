import { frozen, fullscreen, mapfunction, onkey, pausable, saveable, seeded, staticgrid, staticseeded } from "../src/p5js/templates";
import { sketch } from "../src/p5js/composition";
import { grayscale, pallettes } from "../src/colours";
import { ssin } from "../src/maths";
import { perlinnoise } from "../src/maths";
import { pipe } from "../src/fns";

// settings
const sscale = 0.04;
const dscale = 0.02;
const damplt = 70;
const rapidity = 40;

// colour
let colours = pallettes.grass
const color = (val) => colours[Math.floor(val * colours.length)]

const perlin = perlinnoise()

function distancefrom({ x: xx, y: yy }) {
    return ({ x, y }) => Math.hypot(xx - x, yy - y)
}

function polarcoordsfrom({ x: xx, y: yy }) {
    return ({ x, y }) => {
        return {
            r: Math.hypot(xx - x, yy - y),
            theta: Math.atan2(yy - y, xx - x),
            x, y
        }
    }
}

function scale(scale) {
    return ({ x, y }) => { return { x: x * scale, y: y * scale } }
}


const f = pipe(
    scale(0.01),
    polarcoordsfrom({ x: 10, y: -10 }),
    ({ r, theta }) => perlin.noise(r, r * theta),
    (n) => perlin.noise(n * rapidity),
    // ssin,
    color
)

sketch.compose(
    fullscreen, saveable,
    frozen, seeded(perlin.seed),
    mapfunction(f)
)