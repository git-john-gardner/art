import { rainbow } from "../src/colours";
import { dontimes, pipe } from "../src/fns";
import { random } from "../src/maths";
import { noise } from "../src/maths/perlinnoise";
import { sketch } from "../src/p5js/composition";
import { frozen, normal } from "../src/p5js/templates";
import { drawShape } from "../src/p5js/util";
import { perlindistortion } from "../src/pretty";
import { range } from "../src/util";
import { vector, Vector } from "../src/vec";

let shape, center;

const N = 1000, scale = 0.01

const setup = p5 => {
    p5.noFill()
    p5.stroke(0)
    p5.background(55)

    center = vector(p5.width / 2, p5.height / 2)

    // p5.strokeWeight(2)
    shape = range(N).map(i => {
        const theta = i / N * Math.PI * 2
        return Vector.fromAngle(theta).times(1)
    })
}

const draw = p5 => {
    if (p5.frameCount % 100 == 0) {
        center = vector(random(p5.width), random(p5.height))
        shape = range(N).map(i => {
            const theta = i / N * Math.PI * 2
            return Vector.fromAngle(theta)
        })
    }
    p5.stroke(rainbow(p5.frameCount / 70 + 0.5))
    dontimes(15, () =>
        shape = shape.map(p => p.direction.times(noise(p.x * scale + 100, p.y * scale + 100)).plus(p))
    )
    p5.translate(center.x, center.y)

    drawShape(p5, shape, true)
}


sketch.compose(...normal, { setup, draw })