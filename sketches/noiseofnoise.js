import { frozen, mapfunction, normal } from "../src/p5js/templates";
import { pipe, repeat } from "../src/fns";
import { grayscale } from "../src/colours";
import { sketch } from "../src/p5js/composition";
import { smoothstep } from "../src/maths/mappings";
import { noiseofnoise } from "../src/pretty";
import { noisedetail } from "../src/maths/perlinnoise";

const scale = 0.005,
    rapidity = 30,
    octaves = 4,
    falloff = 0.6
noisedetail(octaves, falloff)

const _c = grayscale(255)
const color = (val) => _c[Math.floor(val * _c.length)]

const fn = pipe(
    noiseofnoise(scale, rapidity),
    repeat(smoothstep, 2),
    color
)

sketch.compose(...normal, frozen, mapfunction(fn))