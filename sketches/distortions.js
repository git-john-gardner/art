import { pallettes, randpallette } from "../src/colours";
import { pipe } from "../src/fns";
import { random } from "../src/maths";
import { smoothstep } from "../src/maths/mappings";
import { sketch } from "../src/p5js/composition";
import { frozen, mapfunction, normal } from "../src/p5js/templates";
import { perlindistortion } from "../src/pretty";
import { Donut } from "../src/shapes";
import { range } from "../src/util";
import { vector } from "../src/vec";

const scale = 0.01, amp = 300;

const disortions = range(3).map(seed => perlindistortion(scale, amp, seed));

const fn = pipe(
    ...disortions,
    p => smoothstep(p.x / width) + smoothstep(p.y / height)
)

let _p;
const colour = x => _p[Math.floor(((x + 1 + offset) % 1) * _p.length)]

let shape, width, height, offset;
const setup = p5 => {
    _p = randpallette()
    width = p5.width
    height = p5.height
    offset = random()
    const center = vector(p5.width, p5.height).over(2),
        r = Math.min(p5.width, p5.height) / 2 * 0.5
    shape = new Donut(center, r * 0.2, r)
}

sketch.compose(...normal, frozen, mapfunction(fn, colour), { setup })