import { randchoice, randint, random, seed } from "../src/maths/random"
import { sketch } from "../src/p5js/composition"
import { normal, seeded } from "../src/p5js/templates"
import { drawShape } from "../src/p5js/util"
import { range } from "../src/util"
import { Vector, vector } from "../src/vec"

const _2PI = 2 * Math.PI
const sum = (...fns) => s => fns.reduce((acc, f) => acc.plus(f(s)), vector(0, 0))


const circlular = (r, frequency, phase) => (s) => {
    const theta = (frequency * s + phase) * _2PI
    return Vector.fromAngle(theta).times(r)
}
// const sin = (amp, f, phase) => s => amp * Math.sin((f * s + phase) * _2PI)
// const a = circlular(150, 1, 0)
// const b = (s) => circlular(50, -4, 0.23 + 0.5 * sin(0.3, -5, 0)(s))(s)


const N = 400
const topath = fn => range(N).map(i => fn(i / N))

const drawfn = (p5, fn, s) => {
    drawShape(p5, topath(fn), true)
    const { x, y } = fn(s); p5.circle(x, y, 5)
}

let a, b;

const setup = p5 => {
    const aparams = [randint(50, 70), randint(1, 7), 0]
    const bparams = [randint(50, 100), -randint(1, 7), randchoice([0, 0.1, 0.2])]
    console.log(aparams);
    console.log(bparams);

    a = circlular(...aparams)
    b = circlular(...bparams)
}

const draw = p5 => {
    p5.background(50); p5.noFill(); p5.stroke(255); p5.strokeWeight(2)

    const s = (p5.frameCount / 500) % 1

    p5.translate(p5.width / 2, p5.height / 2)
    drawfn(p5, sum(a, b), s)

}

sketch.compose(...normal, seeded(seed), { setup, draw })