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


export { random, randint, randchoice }