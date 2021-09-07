import { sketch } from "../src/p5js/composition";
import { normal } from "../src/p5js/templates";

let circles;


function setup(p5) {
    const { width, height } = p5
    circles = ncirclesin(width, height)
}

function draw(p5) {
    p5.rect(0, 0, 100, 100)
}

sketch.compose(...normal, { draw })