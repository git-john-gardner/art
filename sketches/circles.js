import { donothing, nthings } from "../src/fns"
import { vector } from "../src/vec"
import { sketch } from "../src/p5js/composition"
import { frozen, fullscreen, saveable, seeded } from "../src/p5js/templates"
import { randchoice, randint, random } from "../src/maths/random"
import { randpallette } from "../src/colours"
import { range } from "../src/util"

let colours;

const discstack = (p5) => {
    const height = randint(3, 10)
    const r = random(40, 120)
    const cs = nthings(height, () => randchoice(colours))
    const centre = vector(random() * p5.width, random() ** (1 / 2) * p5.height)

    return {
        centre, r, cs, height,
        draw(p5) {
            for (const i of range(this.height)) {
                p5.fill(this.cs[i])
                p5.circle(this.centre.x, this.centre.y, this.r * (1 - (i) / this.height))
            }
        }


    }
}

let cs;
const setup = (p5) => {
    colours = randpallette()
    cs = nthings(200, () => discstack(p5))
}
const draw = (p5) => {
    p5.background(50)
    cs.forEach(c => c.draw(p5))
}

sketch.compose(
    saveable, fullscreen, frozen, seeded(donothing),
    { setup, draw }
)
