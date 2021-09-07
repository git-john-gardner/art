import { perlinnoise } from "../src/maths/perlinnoise"
import { vector } from "../src/vec"
import { sketch } from "../src/p5js/composition";
import { normal, seeded } from "../src/p5js/templates";
import { range } from "../src/util";
import { drawShape } from "../src/p5js/util";
import { smoothstep } from "../src/maths/mappings"
import { pallettes } from "../src/colours"

const perlin = perlinnoise()
const scale = 0.001
const N = 10

function ribbon({ width }, y, t) {
    const xbreak = perlin.noise(y * scale, t) * width
    const h = 10, w = 100;
    const points = 20;
    return [
        vector(Math.min(0, xbreak - w), y - h),
        vector(xbreak - w, y - h),
        ...range(points).map(i => {
            const lambda = (i + 0.5) / points
            return vector(
                xbreak + w * lambda,
                y - h + 2 * h * smoothstep(lambda)
            )

        }),
        vector(xbreak + w, y + h),
        vector(Math.max(width, xbreak + w), y + h)
    ]
}

const colours = pallettes.sea;

const draw = (p5) => {
    p5.background(255)
    p5.noFill()
    for (const i of range(N)) {
        const r = ribbon(p5, (i + 0.5) / N * p5.height, p5.frameCount / 100)
        p5.strokeWeight(20); p5.stroke(0); drawShape(p5, r)
        p5.strokeWeight(18); p5.stroke(colours[Math.floor(perlin.noise(i) * colours.length)]); drawShape(p5, r)
    }
}

sketch.compose(...normal, seeded(perlin.seed), { draw })