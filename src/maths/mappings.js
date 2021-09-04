export function i_lerp(val, lo, hi) {
    return (val - lo) / (hi - lo);
}
export function lerp(x, lo, hi) {
    return lo + x * (hi - lo);
}
export function map(val, oldlo, oldhi, newlo, newhi) {
    const lambda = i_lerp(val, oldlo, oldhi);
    return lerp(lambda, newlo, newhi);
}

export function smoothstep(x) {
    return 3 * x ** 2 - 2 * x ** 3
}

export function ismoothstep(x) {
    return 2 * x ** 3 - 3 * x ** 2 + 2 * x
}
