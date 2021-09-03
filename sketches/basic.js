import { randchoice, random } from "../src/maths";
import { fullscreen, pausable, saveable } from "../src/p5js/templates"
import { pallettes } from "../src/colours";
import { sketch } from "../src/p5js/composition";

let colours = pallettes.lavender

function setup(p5) {
    p5.rectMode(p5.CENTER)
    p5.noStroke()
    p5.frameRate(15)
}

function draw(p5) {
    p5.fill(...randchoice(colours), 200)
    p5.translate(random(p5.width), random(p5.height))
    p5.rect(0, 0, random(50, 100))
}

sketch.compose(fullscreen, pausable, saveable, { setup, draw })