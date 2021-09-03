function donothing() { }
function identity(x) { x }

function dontimes(n, thing) {
    let i = n; while (i--) thing()
}
function nthings(n, thing) {
    return new Array(n).fill(0).map(_ => thing())
}

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export { donothing, dontimes, nthings, pipe }