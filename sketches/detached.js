import { pallettes } from "../src/colours"
import { nthings } from "../src/fns";
import { randchoice, random } from "../src/maths";
import { sketch } from "../src/p5js/composition";
import { frozen, fullscreen, resettable, saveable } from "../src/p5js/templates";
import { Vector, vector } from "../src/vec";

const colours = pallettes.child

function circle(p5) {
    const { width: w, height: h } = p5
    const { x: dx, y: dy } = Vector.random2D().times(random(10, 20))
    const colour = randchoice(colours)
    const { x, y } = vector(random(w), random() ** 0.7 * h)
    const r = random(50, 90)
    return {
        draw(p5) {
            p5.fill(colour); p5.noStroke()
            p5.circle(x, y, r * 2)

            p5.noFill(); p5.stroke(255); p5.strokeWeight(4)
            p5.circle(x + dx, y + dy, r * 2)
        }
    }
}


function draw(p5) {
    p5.background(50)
    nthings(30, () => circle(p5)).forEach(c => c.draw(p5))
}

sketch.compose(fullscreen, saveable, frozen, { draw })