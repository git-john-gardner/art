import { fullscreen } from "../src/p5js/templates";
import { sketch } from "../src/p5js/composition";

import { i_lerp, lerp, smoothstep } from "../src/maths/mappings";
import { range } from "../src/util";
import { vector } from "../src/vec";
import { drawShape } from "../src/p5js/util";


const width = 1
let base;

const clamp = (x) => Math.max(Math.min(x, 1), 0)


// colour

const bellcurve = (center) => {
    return x => clamp(Math.sin((x / width + (0.5 - center)) * Math.PI))
    return x => 0.5 + 0.5 * Math.cos((x - center) * 2 * Math.PI)
}


const rainbow = (x) => {
    const fn = bellcurve(x)
    return [0, 1, 2].map(i => {
        const lambda = (i) / 2
        return (base + (1 - base) * fn(lambda)) * 255
    })
}


// const setup = p5 => p5.rectMode(p5.CENTER)
const draw = p5 => {
    const { width: w, height: h } = p5

    const p = 0.2
    p5.translate(p * w / 2, p * h / 2)
    p5.scale(1 - p, 1 - p)

    const center = clamp(i_lerp(p5.mouseX, w * p / 2, w * (1 - p / 2)))
    base = clamp(i_lerp(p5.mouseY, h * (1 - p / 2), h * p / 2))

    const [r, g, b] = rainbow(center)
    p5.background(r, g, b)
    p5.strokeWeight(4)

    p5.fill(255, 0, 0)
    p5.rect(0, h, w / 3, - r / 255 * h)
    p5.circle(w / 6, (1 - r / 255) * h, 40)

    p5.fill(0, 255, 0)
    p5.rect(p5.width / 3, p5.height, p5.width / 3, - g / 255 * p5.height)
    p5.circle(w / 2, (1 - g / 255) * h, 40)

    p5.fill(0, 0, 255)
    p5.rect(2 * p5.width / 3, p5.height, p5.width / 3, - b / 255 * p5.height)
    p5.circle(5 * w / 6, (1 - b / 255) * h, 40)



    let fn = (x) => base + (1 - base) * bellcurve(center)(x)

    p5.noFill()
    p5.strokeWeight(8)

    const points = range(99).map(i => {
        const lambda = i / 98

        return vector(
            p5.width / 6 + lambda * p5.width / 3 * 2,
            p5.height * (1 - fn(lambda))
        )
    })
    drawShape(p5, points)
}

sketch.compose(fullscreen, { draw })
