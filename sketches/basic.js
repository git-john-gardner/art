import { randchoice, random } from "../src/maths";
import { pausablesketch } from "../src/p5js/templates"
import { pallettes } from "../src/colours";

let colours = pallettes.coffee
let bg = randchoice(colours)
const randcolour = () => randchoice(colours.filter(c => c != bg))

function setup(p5) {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.rectMode(p5.CENTER)

    p5.background(bg)
    p5.noStroke()
    p5.frameRate(15)
}

function draw(p5) {
    p5.fill(...randcolour(), 200)
    p5.translate(random(p5.width), random(p5.height))
    p5.rect(0, 0, random(50, 100))
}

pausablesketch(setup, draw)