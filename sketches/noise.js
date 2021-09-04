import { staticgrid } from "../src/p5js/templates";
import { grayscale } from "../src/colours";
import { ssin } from "../src/maths";
import { perlinnoise } from "../src/maths";
import { pipe } from "../src/fns";
import { smoothstep } from "../src/maths/mappings";

// settings
const sscale = 0.04;
const dscale = 0.02;
const damplt = 70;
const rapidity = 40;

// colour
let colours = grayscale(10)
const color = (val) => colours[Math.floor(val * colours.length)]

const perlin = perlinnoise()
perlin.detail(3)

function distortion(scale, amplitude) {
    return ({ x, y }) => {
        return {
            x: x + amplitude * (perlin.noise(x * scale, y * scale) - 0.5),
            y: y + amplitude * (perlin.noise((x + 100) * scale, (y + 100) * scale) - 0.5),
        }
    }
}

function squaressin({ x, y }) {
    return (ssin(x * sscale) + ssin(y * sscale)) / 2
}

staticgrid(
    pipe(
        distortion(dscale, damplt),
        squaressin,
        (n) => perlin.noise(n * rapidity),
        smoothstep,
        // ismoothstep,
        color
    ),
    ({ seed }) => perlin.seed(seed)
)