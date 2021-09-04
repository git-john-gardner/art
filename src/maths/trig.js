import { lerp } from "./mappings";

export function scos(i) {
    return 0.5 * (1.0 + Math.cos(i * Math.PI));
}

export function ssin(x) {
    return lerp(Math.sin(x * Math.PI), -1, 1)//0.5 * (1.0 + Math.sin(x * Math.PI))
}
