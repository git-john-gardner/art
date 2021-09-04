import { ssin } from "../src/maths/trig";
import { sketch } from "../src/p5js/composition";
import { fullscreen, mapfunction, staticseeded } from "../src/p5js/templates";
import { perlinnoise } from "../src/maths";

const perlin = perlinnoise()
const f = ({ x, y }) => ssin(perlin.noise(x * 0.01, y * 0.01) * 255) * 255

sketch.compose(fullscreen, staticseeded(perlin.seed), mapfunction(f))