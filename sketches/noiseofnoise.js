import { staticgrid } from "../src/p5js/templates";
import { perlinnoise, smoothstep } from "../src/maths";
import { pipe } from "../src/fns";

const scale = 0.005
const rapidity = 30

const perlin = perlinnoise()
perlin.detail(4, 0.6)

staticgrid(
    pipe(
        ({ x, y }) => perlin.noise(scale * x, scale * y),
        (n) => perlin.noise(n * rapidity),
        smoothstep,
        smoothstep,
        (v) => 255 * v
    ),
    ({ seed }) => perlin.seed(seed)
)
