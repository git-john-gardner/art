import { pixelgrid, setPixel } from "./util";
import { vector } from "../vec";
import { seed as seedrng, random } from "../maths/random";
import { seed as seednoise } from "../maths/perlinnoise";
import { range } from "../util";

export const pausable = (() => {
    let paused = false
    return {
        setup: () => { paused = false },
        draw: (p5) => {
            if (paused) {
                p5.frameCount--
                return true
            }
        },
        keyPressed: (p5) => { if (p5.key == " ") paused = !paused }
    }
})()

const fullscreen = {
    setup: (p5) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight)
    }
}

const onkey = (key, callback) => {
    return {
        keyPressed: (p5) => {
            if (p5.key == key) callback(p5)
        }
    }
}

const saveable = onkey("s", p5 => p5.saveCanvas("sketch.png"))
const resettable = onkey("r", p5 => p5.setup())

const mapfunction = (fn, colour) => {
    colour = colour || (x => x)
    return (() => {
        return {
            setup: (p5) => { p5.pixelDensity(1) },
            draw: (p5) => {
                p5.loadPixels()
                const tick = performance.now()
                for (const [idx, x, y] of pixelgrid(p5)) {
                    const val = fn(vector(x, y))
                    setPixel(p5, idx, colour(val))
                }
                const tock = performance.now()
                p5.updatePixels()

                const duration = tock - tick
                const calculations = p5.width * p5.height * p5.pixelDensity() ** 2
                console.log("Pixels per ms:", (calculations / duration).toFixed(0));
            }
        }
    })()
}

const seeded = (cb) => (() => {
    let seed = 0
    cb(seed)

    const reset = (p5, ds) => {
        seed += ds
        cb(seed)
        p5.setup()
        p5.frameCount = 0
        console.log(`Seed ${seed}`)
    }

    return {
        keyPressed: (p5) => {
            if (p5.key == "r") {
                reset(p5, 0)
            } else if (p5.key == "ArrowRight") {
                reset(p5, +1)
            } else if (p5.key == "ArrowLeft") {
                reset(p5, -1)
            }
        }
    }
})()

const frozen = {
    draw(p5) { if (p5.frameCount > 1) return true },
}

export const grain = ampl => {
    return {
        draw(p5) {
            p5.loadPixels()
            for (const [idx, x, y] of pixelgrid(p5)) {
                const val = random(-1, 1) * ampl
                range(4).forEach(i => {
                    const __idx = i + idx * 4
                    p5.pixels[__idx] += val
                })
            }
            p5.updatePixels()
        }
    }
}


const normal = [fullscreen, pausable, saveable, seeded(s => { seedrng(s); seednoise(s) })]

export { fullscreen, saveable, mapfunction, onkey, resettable, seeded, normal, frozen }