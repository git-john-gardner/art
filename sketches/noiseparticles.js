import { pallettes } from "../src/colours";
import { noise } from "../src/maths/perlinnoise";
import { sketch } from "../src/p5js/composition";
import { normal } from "../src/p5js/templates";
import { Particle } from "../src/particle";
import { Circle } from "../src/shapes";
import { range } from "../src/util";
import { Vector, vector } from "../src/vec";

const dt = 2
const scale = 0.003
const N = 1000;
const rapidity = 50

let particles;


const move = particle => {
    const { position: { x, y }, velocity } = particle
    const n = noise(x * scale, y * scale)
    const amp = n * 0.5
    const noisefieldacc = Vector.fromAngle(n * rapidity).times(amp)

    const k = 0.3
    const friction = velocity.direction.times(-1 * k)
    const accel = noisefieldacc.plus(friction)

    particle.velocity.add(accel.times(dt))
    particle.move(dt)
}

const setup = p5 => {
    p5.background(55)
    p5.strokeWeight(4)
    particles = [];

    const { width, height } = p5
    const maxr = Math.min(width, height) * 0.5 / 2
    const center = vector(width / 2, height / 2);
    [0.5, 0.75, 1].forEach((mult, idx) => {
        const colour = pallettes.grass[idx]
        const circle = new Circle(center, maxr * mult)

        range(N).forEach(i => {
            const p = new Particle(circle.pointonperimeter(i / N))
            p.colour = colour
            particles.push(p)
        })
    })
}

const draw = p5 => {
    const alpha = 50 - 0.5 * p5.frameCount
    if (alpha < 0) return

    particles.forEach(({ position: { x, y }, colour }) => {
        p5.stroke(...colour, alpha)
        p5.point(x, y)
    })

    particles.forEach(move)
}

sketch.compose(...normal, { setup, draw })