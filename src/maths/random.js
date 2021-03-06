import { dontimes } from "../fns";

export function repeatablyrandom(initseed = 0) {
    // Linear Congruential Generator
    // see https://en.wikipedia.org/wiki/Linear_congruential_generator
    let z;
    const [m, a, c] = [4294967296, 1664525, 1013904223];
    const gen = {
        seed(s) {
            z = s >>> 0
            // NB seeding doesn't need to be fast. Also,
            // similar seeds lead to similar sequences.
            // These two steps effectively remove 
            // correlation between neighbouring seeds.
            dontimes(100, this.rand)
            z = (this.rand() * m) >>> 0
        },
        rand() {
            z = (a * z + c) % m;
            return z / m;
        },
    }

    gen.seed(initseed)
    return gen
}

const _rr = repeatablyrandom(Math.random() * 1000)

export function random(x, y) {
    const r = _rr.rand();

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

export function seed(s) {
    _rr.seed(s)
}