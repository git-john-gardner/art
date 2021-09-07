/*
Thoughts:
    - move the points around? animation
    - more than once circle
        point to closest
        point to random
    - distortion field

*/

import { Vector, vector } from "../src/vec"
import { sketch } from "../src/p5js/composition";
import { frozen, normal, seeded } from "../src/p5js/templates";
import { nthings } from "../src/fns";
import { random, randchoice, randint, seed as setrng } from "../src/maths/random";
import { pallettes, randpallette } from "../src/colours"
import { drawShape } from "../src/p5js/util";
import { range } from "../src/util";
import { perlinnoise } from "../src/maths";

const perlin = perlinnoise()

const distort = p => {
    const rapidity = 100;
    const scale = 0.001;
    const amp = perlin.noise(100 + p.x * scale, 100 + p.y * scale, 100) * 20
    const theta = perlin.noise(100 + p.x * scale, 100 + p.y * scale) * rapidity
    return Vector.fromAngle(theta).times(amp).plus(p)
}

function distancefrom(circle, point) {
    return point.minus(circle.centre).mag - circle.r
}

function incircle(circle, point) {
    return distancefrom(circle, point) < 0
}

const circle = {
    centre: vector(0, 0),
    r: 100
}

const path = p => {
    const tocenter = circle.centre.minus(p).direction
    const dist = distancefrom(circle, p)

    return range(100).map(i => {
        const lambda = i / 99
        return tocenter.times(lambda * dist * 0.7).plus(p)
    })
}

const line = (p) => {
    const _path = path(p)
    return {
        draw(p5, distortion) {
            p5.stroke(randchoice(colours))
            drawShape(p5, _path.map(distortion))
        }
    }
}



let colours;
const setup = () => colours = randpallette()

const draw = p5 => {
    const w = p5.width, h = p5.height;
    const N = randint(100, 1000)

    console.log(N);

    const randpoint = () => {
        let point = circle.centre
        while (incircle(circle, point))
            point = vector(random(w), random(h)).minus(vector(w / 2, h / 2))
        return point
    }

    p5.translate(w / 2, h / 2)
    p5.background(50); p5.noFill(); p5.strokeWeight(2)


    nthings(N, randpoint)
        .forEach(p => line(p).draw(p5, distort))
}

sketch.compose(
    ...normal, frozen,
    seeded(s => { setrng(s); perlin.seed(s) }),
    { setup, draw }
)
