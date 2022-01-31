import { randpallette } from "../src/colours";
import { smoothstep } from "../src/maths/mappings";
import { noise } from "../src/maths/perlinnoise";
import { sketch } from "../src/p5js/composition";
import { normal } from "../src/p5js/templates";
import { Particle } from "../src/particle";
import { Circle } from "../src/shapes"
import { range } from "../src/util";
import { Vector, vector } from "../src/vec"

let particles, colours;

const N = 1000, weight = 4, rapidity = 50;

const setup = p5 => {
    p5.background(50)
    p5.strokeWeight(weight)
    const { width, height } = p5
    const center = vector(width, height).over(2)
    const r = Math.min(width, height) * 0 / 2
    const circle = new Circle(center, r)

    colours = randpallette()
    const colour = x => colours[Math.floor(smoothstep(x) * colours.length)]

    particles = []
    range(N).forEach(i => {
        const turn = i / N
        const p = new Particle(circle.pointonperimeter(turn), Vector.fromAngle(turn * 2 * Math.PI))
        p.colour = colour(noise(turn * rapidity))
        particles.push(p)
    })
}

const draw = p5 => {
    particles.forEach(p => {
        const { position: { x, y } } = p
        p.velocity.add(Vector.fromAngle(noise(x * 0.003, y * 0.003) * 50).times(0.03))
        p.move(1)
        p5.stroke(...p.colour, 10)
        p5.point(x, y)
    })

}

sketch.compose(...normal, { setup, draw })