function donothing() { }
function identity(x) { return x }

function dontimes(n, thing) {
    let i = n; while (i--) thing()
}
function nthings(n, thing) {
    return new Array(n).fill(0).map(_ => thing())
}

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const repeat = (fn, times) => pipe(...nthings(times, () => fn))

export const raisetopower = n => x => x ** n


export { donothing, dontimes, nthings, pipe, repeat }