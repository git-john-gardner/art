import { pipe } from "../src/fns";
import { randint } from "../src/maths";
import { sketch } from "../src/p5js/composition";
import { frozen, mapfunction, normal } from "../src/p5js/templates";
import { pixelgrid, setPixel } from "../src/p5js/util";
import { perlindistortion } from "../src/pretty";
import { Donut, Triangle } from "../src/shapes";
import { range } from "../src/util";
import { vector } from "../src/vec";

const scale = 0.01, amp = 180;

const disortions = range(2).map(seed => perlindistortion(scale, amp, seed));

const fn = pipe(
    // ...disortions,
    p => {
        for (const shape of shapes) {
            if (shape.contains(p)) return 0
        }
        return 1
    }
)

const colour = x => x == 0 ? [114, 118, 184] : 255

let shapes;
const setup = p5 => {
    const center = vector(p5.width, p5.height * 1.2).over(2),
        r = Math.min(p5.width, p5.height) / 2 * 0.5
    // shape = new Donut(center, r * 0.2, r)
    const midx = p5.width / 2
    const wx = 120
    shapes = [
        new Triangle(vector(midx - wx, 600), vector(midx + wx, 600), vector(midx, 100)),
        new Donut(center, r * 0.5, r)
    ]
}


sketch.compose(...normal, frozen, mapfunction(fn, colour), { setup })