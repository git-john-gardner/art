import { randpallette } from "../src/colours";
import { nthings, pipe } from "../src/fns"
import { randchoice, random } from "../src/maths"
import { sketch } from "../src/p5js/composition";
import { frozen, mapfunction, normal } from "../src/p5js/templates";
import { perlindistortion } from "../src/pretty";
import { Circle } from "../src/shapes"
import { range } from "../src/util";
import { vector } from "../src/vec"

let circles, pallette;

const setup = p5 => {
    const { width: w, height: h } = p5
    pallette = randpallette()
    circles = nthings(20, () => {
        const pos = vector(random(w * 0.3, w * 0.7), random(h * 0.3, h * 0.7))
        const r = random(20, 80)
        const c = new Circle(pos, r)
        c.colour = randchoice(pallette)
        return c
    })
}

const _fn = p => {
    for (const c of circles) {
        if (c.contains(p)) {
            return c.colour
        }
    }
    return 255
}

const disortions = range(3).map(seed => perlindistortion(0.01, 300, seed));
const fn = pipe(
    ...disortions,
    _fn
)

sketch.compose(...normal, frozen, mapfunction(fn), { setup })