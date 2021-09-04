import { dontimes } from "../fns";

export function random(x, y) {
    const r = Math.random();

    if (x === undefined)
        return r;
    if (y === undefined)
        [y, x] = [x, 0];

    return r * (y - x) + x;
}

export function randint(x, y) {
    return Math.floor(random(x, y))
}

export function randchoice(arr) {
    const idx = randint(arr.length)
    return arr[idx]
}

export function repeatablyrandom(initseed = 0) {
    // Linear Congruential Generator
    // see https://en.wikipedia.org/wiki/Linear_congruential_generator
    let z;
    const [m, a, c] = [4294967296, 1664525, 1013904223];
    const gen = {
        seed(s) {
            z = s >>> 0
            // first few numbers are similar for similar seeds
            dontimes(10, gen.rand)
        },
        rand() {
            z = (a * z + c) % m;
            return z / m;
        }
    }

    gen.seed(initseed)
    return gen
}