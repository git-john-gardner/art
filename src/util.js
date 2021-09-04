function* enumerate(it) {
    let i = 0
    for (const x of it)
        yield [i++, x]
}

function* range(max) {
    let i = -1
    while (++i < max)
        yield i
}

function collect(iter) {
    const arr = []
    for (const element of iter)
        arr.push(element)
    return arr
}

function allkeys(...objects) {
    const keys = new Set()
    objects.forEach(o => Object.keys(o).forEach(k => keys.add(k)))
    return keys
}

const assertordered = (...args) => {
    const err = () => { throw `${args} not ordered!` }
    const reducer = (a, b) => {
        if (a > b) err()
        return b
    }
    args.reduce(reducer)
}

function* pairs(arr) {
    const N = arr.length
    for (let i = 0; i < N - 1; i++) {
        yield arr.slice(i, i + 2)
    }
}

const time = (fn, msg = "duration:") => {
    const tick = performance.now()
    const ret = fn()
    const tock = performance.now()
    console.log(msg, `${(tock - tick).toFixed(1)}ms`, fn.name)
    return ret;
}

export { enumerate, range, collect, allkeys, pairs, assertordered, time }