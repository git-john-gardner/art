import { frozen, fullscreen, mapfunction, saveable, seeded } from "../src/p5js/templates";
import { perlinnoise, } from "../src/maths";
import { pipe } from "../src/fns";
import { grayscale, pallettes, randpallette } from "../src/colours";
import { sketch } from "../src/p5js/composition";
import { smoothstep } from "../src/maths/mappings";
import { vector } from "../src/vec";
import { seed as setrng } from "../src/maths/random";
import { Circle } from "../src/shapes";
import { spiral } from "../src/distortions";


const scale = 0.005
const rapidity = 30

const perlin = perlinnoise()
perlin.detail(4, 0.6)

// const _c = grayscale(255)
let _c; //= pallettes.child
const color = (val) => _c[Math.floor(val * _c.length)]

const fn = pipe(
    p => spiral(circle, 0.2)(p),
    ({ x, y }) => perlin.noise(scale * x, scale * y),
    (n) => perlin.noise(n * rapidity),
    smoothstep,
    smoothstep,
    color
)

let circle;
function setup(p5) {
    _c = randpallette()
    const { width: w, height: h } = p5
    circle = new Circle(vector(w / 2, h / 2), Math.min(w / 2, h / 2) * 0.8)
}

sketch.compose(
    fullscreen, saveable,
    frozen, seeded(s => { perlin.seed(s); setrng(s) }),
    mapfunction(fn),
    { setup }
)