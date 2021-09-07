import { pallettes, randpallette } from "../src/colours";
import { randchoice } from "../src/maths";
import { sketch } from "../src/p5js/composition";
import { normal, resettable } from "../src/p5js/templates";
import { range } from "../src/util";
import { vector } from "../src/vec";

let circles;
let colours;

class Circle {
    constructor(center, r, depth = 0) {
        this.center = center
        this.r = r
        this.depth = depth
    }

    split() {
        const middle = new Circle(this.center, this.r / 3, this.depth + 1)
        const disp = vector(2 * this.r / 3, 0)
        const outers = []
        for (const i of range(6)) {
            const theta = i / 6 * 2 * Math.PI
            outers.push(new Circle(
                disp.rotatedby(theta).add(this.center),
                this.r / 3,
                this.depth + 1
            ))
        }
        return [middle, ...outers]
    }

    draw(p5) {
        p5.fill(colours[this.depth % colours.length])
        // p5.fill(randchoice(colours))
        p5.circle(this.center.x, this.center.y, this.r * 2)
    }

}

function pop() {
    const c = randchoice(circles)
    circles.splice(circles.indexOf(c), 1)
    const replacements = c.split()
    replacements.forEach(a => circles.push(a))
}

function setup(p5) {
    colours = pallettes.child
    p5.frameRate(2)
    const centre = vector(p5.width, p5.height).over(2)
    const r = Math.min(p5.width, p5.height) * 0.5

    circles = [new Circle(centre, r)]
}

function draw(p5) {
    circles.forEach(c => c.draw(p5))
    pop()
}

sketch.compose(...normal, resettable, { setup, draw })