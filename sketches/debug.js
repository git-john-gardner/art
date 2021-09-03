import { nthings } from "../src/fns";
import { perlinnoise } from "../src/maths";

const p = perlinnoise()
debugger
console.log(p.noise(9.81, 29.25))
console.log(nthings(5, Math.random))