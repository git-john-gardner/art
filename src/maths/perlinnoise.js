import { nthings } from "../fns";
import { repeatablyrandom } from "./random";

const _strange_cos = (i) => 0.5 * (1.0 - Math.cos(i * Math.PI))


// TODO can this be sped up?
// TODO 4+ dimensional?
export function perlinnoise(seed = 0) {
    // adapted from p5.js: 
    // see https://github.com/processing/p5.js/blob/374acfb44588bfd565c54d61264df197d798d121/src/math/noise.js
    const gen = repeatablyrandom(seed);

    const size = (1 << 12) - 1;
    let perlin = nthings(size + 1, gen.rand);

    const PERLIN_YWRAPB = 4;
    const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
    const PERLIN_ZWRAPB = 8;
    const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
    const PERLIN_SIZE = 4095;

    let octaves = 4; // default to medium smooth
    let falloff = 0.5; // 50% reduction/octave

    const noise = function (x, y = 0, z = 0) {
        let totala = 0;
        if (x < 0)
            x = -x;
        if (y < 0)
            y = -y;
        if (z < 0)
            z = -z;

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

            rxf = _strange_cos(xf);
            ryf = _strange_cos(yf);

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

            n1 += _strange_cos(zf) * (n2 - n1);

            r += n1 * ampl;
            totala += ampl;
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
    };

    return {
        noise,
        seed(val) {
            gen.seed(val);
            perlin = nthings(size + 1, gen.rand);
        },
        detail(o = 4, f = 0.5) {
            octaves = o;
            falloff = f;
        },
    };
}
