import { frozen, mapfunction, normal } from "../src/p5js/templates";
import { sketch } from "../src/p5js/composition";
import { pallettes } from "../src/colours";
import { pipe, repeat } from "../src/fns";
import { smoothstep } from "../src/maths/mappings";
import { squaressin } from "../src/maths/trig";
import { perlindistortion } from "../src/pretty";
import { noise } from "../src/maths/perlinnoise";

// settings
const sscale = 0.005;
const dscale = 0.02;
const damplt = 100;
const rapidity = 10;

// colour
let colours = pallettes.child
const color = (val) => colours[Math.floor(val * colours.length)]

const f = pipe(
    perlindistortion(dscale, damplt),
    p => squaressin(p.times(sscale)),
    (n) => noise(n * rapidity),
    repeat(smoothstep, 2),
    color
)

sketch.compose(...normal, frozen, mapfunction(f))
