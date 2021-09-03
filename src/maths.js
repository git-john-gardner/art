import { dontimes, nthings } from "./fns";

function random(x, y) {
    const r = Math.random();

    if (x === undefined)
        return r
    if (y === undefined)
        [y, x] = [x, 0]

    return r * (y - x) + x
}

function randint(x, y) {
    return Math.floor(random(x, y))
}

function randchoice(arr) {
    const idx = randint(arr.length)
    return arr[idx]
}

function ssin(x) {
    return 0.5 * (1 + Math.sin(x))
}

function smoothstep(x) {
    return 3 * x ** 2 - 2 * x ** 3
}

function parts(num) {
    const int = Math.floor(num)
    return [int, num - int]
}

function abs(num) {
    return num > 0 ? num : -num
}

function repeatablyrandom(initseed) {
    // Linear Congruential Generator
    // see https://en.wikipedia.org/wiki/Linear_congruential_generator
    let z;
    const [m, a, c] = [4294967296, 1664525, 1013904223];
    const gen = {
        seed(s) { z = s >>> 0 },
        rand() {
            z = (a * z + c) % m;
            return z / m;
        }
    }

    if (initseed == undefined)
        initseed = Math.random() * m

    gen.seed(initseed)
    // first few numbers are similar for similar seeds
    dontimes(10, gen.rand)

    return gen
}

const scaledcosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));

// TOOD can this be sped up?
// TODO 4+ dimensional?
function perlinnoise(seed) {
    // adapted from p5.js: 
    // see https://github.com/processing/p5.js/blob/374acfb44588bfd565c54d61264df197d798d121/src/math/noise.js

    const gen = repeatablyrandom(seed)

    const size = 1 << 12 - 1
    let perlin = nthings(size + 1, gen.rand)

    const PERLIN_YWRAPB = 4;
    const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
    const PERLIN_ZWRAPB = 8;
    const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
    const PERLIN_SIZE = 4095;

    let octaves = 4; // default to medium smooth
    let falloff = 0.5; // 50% reduction/octave

    const noise = function (x, y = 0, z = 0) {
        let totala = 0
        if (x < 0) x = -x;
        if (y < 0) y = -y;
        if (z < 0) z = -z;

        let xi = Math.floor(x);
        let yi = Math.floor(y);
        let zi = Math.floor(z);
        let xf = x - xi;
        let yf = y - yi;
        let zf = z - zi;
        let rxf, ryf;

        let r = 0;
        let ampl = 0.5;

        let n1, n2, n3;

        for (let o = 0; o < octaves; o++) {
            let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

            rxf = scaledcosine(xf);
            ryf = scaledcosine(yf);

            n1 = perlin[of & PERLIN_SIZE];
            n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
            n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
            n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);

            of += PERLIN_ZWRAP;
            n2 = perlin[of & PERLIN_SIZE];
            n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
            n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
            n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);

            n1 += scaledcosine(zf) * (n2 - n1);

            r += n1 * ampl;
            totala += ampl
            ampl *= falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;

            if (xf >= 1.0) {
                xi++;
                xf--;
            }
            if (yf >= 1.0) {
                yi++;
                yf--;
            }
            if (zf >= 1.0) {
                zi++;
                zf--;
            }
        }
        return r / totala;
    }

    return {
        noise,
        seed(val) {
            gen.seed(val)
            perlin = nthings(size, gen.rand)
        },
        detail(o = 4, f = 0.5) {
            octaves = o;
            falloff = f
        }
    }
}



export { random, randint, randchoice, repeatablyrandom, perlinnoise, ssin, smoothstep }