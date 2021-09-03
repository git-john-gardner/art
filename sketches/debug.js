import { random } from "../src/maths"
import { composesketch, fullscreen, pausable, saveable } from "../src/p5js/templates"

function draw(p5) {
    const [x, y] = [random(p5.width), random(p5.height)]
    p5.rect(x, y, 50)
}

composesketch(pausable, fullscreen, saveable, { draw })