import { enumerate, range } from "../util";

function* pixelgrid(p5) {
    const d = p5.pixelDensity()
    const [w, h] = [p5.width * d, p5.height * d]
    for (const [ix, x] of enumerate(range(w))) {
        for (const [iy, y] of enumerate(range(h))) {
            const idx = ix + iy * w;
            yield [idx, x / d, y / d]
        }
    }
}

function setPixel(p5, idx, col) {
    // default alpha = 255
    p5.pixels[idx * 4 + 3] = 255

    // handle grayscale
    if (!(col instanceof Array))
        col = [col, col, col]

    // do the setting
    col.forEach((c, i) => p5.pixels[4 * idx + i] = c)
}

function drawShape(p5, points) {
    p5.beginShape()
    points.forEach(({ x, y }) => p5.vertex(x, y))
    p5.endShape()
}

export { pixelgrid, setPixel, drawShape }