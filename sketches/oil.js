import { grayscale } from "../src/colours";
import { pipe, repeat } from "../src/fns";
import { noise } from "../src/maths/perlinnoise";
import { sketch } from "../src/p5js/composition";
import { frozen, mapfunction, normal } from "../src/p5js/templates";

const scale = 0.004
const rapidity = 50

const fn = pipe(
    p => noise(p.x * scale, p.y * scale),
    repeat(x => Math.sin(x * rapidity), 2),
)

const _p = grayscale(10)
const colour = x => _p[Math.floor(x * _p.length)]

sketch.compose(...normal, frozen, mapfunction(fn, colour))