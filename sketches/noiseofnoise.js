import { frozen, fullscreen, mapfunction, saveable, seeded } from "../src/p5js/templates";
import { perlinnoise } from "../src/maths";
import { pipe } from "../src/fns";
import { grayscale } from "../src/colours";
import { sketch } from "../src/p5js/composition";
import { smoothstep } from "../src/maths/mappings";

const scale = 0.005
const rapidity = 30

const perlin = perlinnoise()
perlin.detail(4, 0.6)

const _c = grayscale(255)
const color = (val) => _c[Math.floor(val * _c.length)]

const fn = pipe(
    ({ x, y }) => perlin.noise(scale * x, scale * y),
    (n) => perlin.noise(n * rapidity),
    smoothstep,
    smoothstep,
    color
)

sketch.compose(
    fullscreen, saveable,
    frozen, seeded(perlin.seed),
    mapfunction(fn)
)