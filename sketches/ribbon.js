import { pallettes } from "../src/colours"
import { nthings } from "../src/fns"
import { perlinnoise, repeatablyrandom } from "../src/maths"
import { lerp } from "../src/maths/mappings"
import { sketch } from "../src/p5js/composition"
import { frozen, normal, seeded } from "../src/p5js/templates"
import { drawShape } from "../src/p5js/util"
import { ribbon } from "../src/ribbon"
import { range } from "../src/util"
import { Vector, vector } from "../src/vec"

const perlin = perlinnoise()
const gen = repeatablyrandom()

const colours = pallettes.sailor

const reset = (seed) => {
    perlin.seed(seed)
    gen.seed(seed)
}

const randribbon = (p5) => {
    const direction = Vector.random2D(gen.rand)
    const perp = direction.perp
    const start = vector(gen.rand() * p5.width, gen.rand() * p5.height)
    const seed = gen.rand() * 1000

    let points = []
    for (const i of range(100)) {
        const pos = direction.times(i * 5).plus(start)
        const n = perlin.noise(i * 0.05, seed)
        const perturb = perp.times(lerp(n, -1, 1) * 40)
        points.push(pos.plus(perturb))
    }
    return ribbon(
        points, {
        weight: 4 + gen.rand() * 16,
        c: colours[Math.floor(gen.rand() * colours.length)],
        offset: gen.rand(),
        draw(p5, t) {
            const ps = this.at(t)

            p5.noFill()

            p5.stroke(0); p5.strokeWeight(this.weight + 4)
            drawShape(p5, ps)

            p5.stroke(this.c); p5.strokeWeight(this.weight)
            drawShape(p5, ps)

        },
    })
}

let rs = [];

const setup = p5 => {
    rs = nthings(60, () => randribbon(p5))
};

const draw = p5 => {
    p5.background(50)
    const t = p5.frameCount / 300
    rs.forEach(r => r.draw(p5, t))
};

sketch.compose(...normal, seeded(reset), { setup, draw })

