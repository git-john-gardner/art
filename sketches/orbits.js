import { nthings } from "../src/fns";
import { Vector, vector } from "../src/vec";
import { Particle } from "../src/particle";
import { random } from "../src/maths";
import { sketch } from "../src/p5js/composition";
import { normal } from "../src/p5js/templates";
import { range } from "../src/util";

let planets, particles;

const N = 1, dt = 0.01;

const clamp = (x) => Math.max(Math.min(x, 1), 0)

const bellcurve = (center) => {
    return x => clamp(Math.sin((x / 1 + (0.5 - center)) * Math.PI))
    return x => 0.5 + 0.5 * Math.cos((x - center) * 2 * Math.PI)
}


const rainbow = (x) => {
    const base = 0.5
    const fn = bellcurve(x)
    return [0, 1, 2].map(i => {
        const lambda = (i) / 2
        return (base + (1 - base) * fn(lambda)) * 255
    })
}

const draw = p5 => {
    p5.stroke(rainbow(p5.frameCount / 300))
    p5.strokeWeight(2)

    range(400).forEach(_ => {
        particles.forEach(p => {
            const { position: { x, y } } = p
            const n = nearestplanet(p.position)
            const accel = n.minus(p.position).direction.times(5)
            p.velocity.add(accel.times(dt))
            p.move(dt)
            p5.point(x, y)
        });
    })
}

const nearestplanet = p => {
    let nearest, distance = Infinity
    for (const planet of planets) {
        const d = p.minus(planet).mag;
        if (d < distance) {
            nearest = planet
            distance = d
        }
    }
    return nearest
}

const randaboutcenter = (p5, s = 0.4) => {
    const { width: w, height: h } = p5
    return vector(
        random(w * (0.5 - s / 2), w * (0.5 + s / 2)),
        random(h * (0.5 - s / 2), h * (0.5 + s / 2))
    )
}

const setup = p5 => {
    p5.background(50)

    planets = nthings(5, () => randaboutcenter(p5))

    particles = nthings(N, () => {
        const pos = randaboutcenter(p5, 0.6)
        const vel = Vector.random2D().times(20)
        return new Particle(pos, vel)
    })
}

sketch.compose(...normal, { draw, setup })