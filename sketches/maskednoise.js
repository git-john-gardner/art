import { frozen, fullscreen, mapfunction, saveable, seeded } from "../src/p5js/templates";
import { perlinnoise } from "../src/maths";
import { nthings, pipe } from "../src/fns";
import { grayscale, pallettes } from "../src/colours";
import { sketch } from "../src/p5js/composition";
import { map, smoothstep } from "../src/maths/mappings";
import { vector } from "../src/vec";
import { seed as setrng, random } from "../src/maths/random";

const scale = 0.005
const rapidity = 30

const perlin = perlinnoise()
perlin.detail(4, 0.6)

const clamp = x => Math.max(Math.min(x, 1), 0)

const _c = grayscale(255)
// const _c = pallettes.sailor

const any = truthies => {
    for (const t of truthies)
        if (t) return true
    return false
}

let circles;

class Circle {
    constructor(centre, r) {
        this.centre = centre; this.r = r
    }
    contains({ x, y }) {
        const displacement = this.centre.minus(vector(x, y))
        return displacement.mag < this.r
    }
}

function setup(p5) {

    circles = nthings(10, () => {
        const centre = vector(random(p5.width), random(p5.height))
        return new Circle(centre, random(50, 120))
    })
}

const ismasked = p => any(circles.map(c => c.contains(p)))

const color = val => {
    const lambda = clamp(map(val, 0.4, 1, 0, 1))
    return _c[Math.floor(lambda * _c.length)]
}

const fn = p => {
    if (ismasked(p)) return color(0)
    return pipe(
        ({ x, y }) => perlin.noise(scale * x, scale * y),
        (n) => perlin.noise(n * rapidity),
        smoothstep,
        smoothstep,
        color
    )(p)
}

sketch.compose(
    fullscreen, saveable,
    frozen, seeded(s => { perlin.seed(s); setrng(s) }),
    mapfunction(fn),
    { setup }
)