import { frozen, fullscreen, mapfunction, saveable, seeded, staticseeded } from "../src/p5js/templates";
import { sketch } from "../src/p5js/composition";
import { perlinnoise } from "../src/maths";

import { pipe } from "../src/fns";

// colour
const bellcurve = (center, width = 1) => {
    return x => Math.sin((x / width + (0.5 - center)) * Math.PI)
}

const rainbow = (x) => {
    const fn = bellcurve(x)
    return [0, 1, 2].map(i => {
        const lambda = (i) / 2
        const base = 200;
        return base + (255 - base) * fn(lambda)
    })
}

const perlin = perlinnoise()


const f = pipe(
    ({ x, y }) => Math.sin(x * 0.01 + y * 0.01),
    // smoothstep,
    // smoothstep,
    rainbow
    // (x) => x * 255
)

sketch.compose(
    fullscreen, saveable,
    frozen, seeded(perlin.seed),
    mapfunction(f)

)
