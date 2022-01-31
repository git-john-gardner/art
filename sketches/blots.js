import { grayscale, pallettes, randpallette } from "../src/colours";
import { pipe, repeat } from "../src/fns";
import { noise } from "../src/maths/perlinnoise";
import { sketch } from "../src/p5js/composition";
import { frozen, grain, mapfunction, normal } from "../src/p5js/templates";
import { perlindistortion } from "../src/pretty";
import { Circle, Donut, Square } from "../src/shapes";
import { range } from "../src/util";
import { vector } from "../src/vec";

const scale = 0.01, amp = 300;

const disortions = range(4).map(seed => perlindistortion(scale, amp, seed));

const fn = pipe(
    ...disortions,
    p => shape.contains(p) ? 0 : 1
)

const colour = x => x == 0 ? 50 : [199, 26, 26] //: 255

let shape;
const setup = p5 => {
    const center = vector(p5.width, p5.height).over(2),
        r = Math.min(p5.width, p5.height) / 2 * 0.5
    shape = new Donut(center, r * 0.2, r)
}

sketch.compose(...normal, frozen, mapfunction(fn, colour), { setup }, grain(100))