import { random } from "../src/maths"
import { sketch } from "../src/p5js/composition"
import { fullscreen, pausable, saveable } from "../src/p5js/templates"


function draw(p5) {
    const [x, y] = [random(p5.width), random(p5.height)]
    p5.rect(x, y, 50)
}

sketch.compose(pausable, fullscreen, saveable, { draw })