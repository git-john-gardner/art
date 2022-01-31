import { rainbow } from "../src/colours"
import { noise } from "../src/maths/perlinnoise"
import { sketch } from "../src/p5js/composition"
import { frozen, normal } from "../src/p5js/templates"
import { range } from "../src/util"
import { Vector, vector } from "../src/vec"


function* grid(p5, spacing = 20) {
    const { width: w, height: h } = p5
    const nx = w / spacing, ny = h / spacing;
    for (let x of range(nx)) {
        x = (x + 0.5) / nx * w
        for (let y of range(ny)) {
            y = (y + 0.5) / ny * h
            yield vector(x, y)
        }
    }
}

function visualise(forcefield) {
    return {
        setup(p5) { p5.strokeCap(p5.SQUARE) },
        draw(p5) {
            for (const p of grid(p5, 20)) {
                const force = forcefield(p).times(20)
                const theta = force.angle2D / (2 * Math.PI)
                // p5.stroke(rainbow(theta))
                // p5.strokeWeight(10 * force.mag / 20)
                p5.strokeWeight(5)
                p5.point(p.x, p.y)
                p5.strokeWeight(2)
                p5.line(p.x, p.y, p.x + force.x, p.y + force.y)
            }
        }
    }
}

const scale = 0.002, rapidity = 10;

const ff = p => {
    const centrepetal = p.minus(center).direction.rotatedby(Math.PI / 2)
    p = p.times(scale)
    const noisy = Vector.fromAngle(noise(p.x, p.y) * rapidity)
    return centrepetal.plus(noisy)
}

let center;
const setup = p5 => {
    center = vector(p5.width / 2, p5.height / 2)
}

sketch.compose(...normal, frozen, visualise(ff), { setup })