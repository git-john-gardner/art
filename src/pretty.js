import { noise } from "./maths/perlinnoise";
import { vector } from "./vec";

export function noiseofnoise(scale, rapidity) {
    return p => {
        const n = noise(p.x * scale, p.y * scale)
        return noise(n * rapidity)
    }
}

export function perlindistortion(scale, amplitude, seed = 0) {
    return ({ x, y }) => {
        return vector(
            x + amplitude * (noise(x * scale, y * scale, seed) - 0.5),
            y + amplitude * (noise((x + 100) * scale, (y + 100) * scale, seed) - 0.5)
        )
    }
}