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

export { enumerate, range, collect, allkeys }